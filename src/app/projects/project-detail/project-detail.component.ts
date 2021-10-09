import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../task/task';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [MessageService]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @Input() projectID!: string;

  project!: Project;

  todoTasks!: Task[];
  doingTasks!: Task[];
  doneTasks!: Task[];

  projectSubscription!: Subscription;
  taskSubscription!: Subscription;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private messageService: MessageService) {
      
    }


  ngOnInit(): void {
    if(!this.projectID){
      this.projectID = String(this.route.snapshot.paramMap.get('id'));
    }
    this.getProject();
    this.getTasks();
  }
  
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }

  updateTaskLists(){
    this.todoTasks = this.project.tasks.filter(t => t.status === TaskStatus.Todo);
    this.doingTasks = this.project.tasks.filter(t => t.status === TaskStatus.Doing);
    this.doneTasks = this.project.tasks.filter(t => t.status === TaskStatus.Done);
  }

  addTask(task: Task): void{
    this.project.tasks.push(task);
    this.projectService.addTask(task);
    this.updateTaskLists();
  }

  getTasks(){
    this.taskSubscription = this.projectService.getTasks(this.projectID)
    .pipe(first())
    .subscribe(
      (tasks) => {
        this.project.tasks = tasks;
        this.updateTaskLists();
      }
    )
  }

  getProject(){
    this.projectSubscription = this.projectService.getProject(this.projectID)
    .subscribe(project => {
      this.project = project;
    });
    
  }

  removeTask(taskID: string): void{
    const found = this.project.tasks.findIndex(t => t.id === taskID);
    if (found > -1){
      this.messageService.clear();
      const deletedTask = this.project.tasks.splice(found, 1)

      // remove task in database
      this.projectService.deleteTask(taskID).then(
        () => {
          this.messageService.add(
            {severity:'success', 
            summary: 'Syncing', 
            detail: `"${deletedTask[0].description}" deleted`}
          )
        }
      );
      this.updateTaskLists();
    }
  }

  drop(event: CdkDragDrop<Task[]>){
    const task: Task = event.item.data;

    if(!task){ return; }

    if(event.container.element.nativeElement.classList.contains("delete-box")){
      this.removeTask(task.id)
    }
    else if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else if (event.previousContainer !== event.container ){
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const containerID = event.container.element.nativeElement.parentElement?.id;
      let newTaskStatus!: TaskStatus;
      switch (containerID) {
        case "to-do-tasks":
          newTaskStatus = TaskStatus.Todo;
          break;
        case "doing-tasks":
          newTaskStatus = TaskStatus.Doing;
          break;
        case "done-tasks":
          newTaskStatus = TaskStatus.Done;
          break;
      }
      task.status = newTaskStatus;
      this.projectService.updateTaskStatus(task.id, newTaskStatus);
    }
  }
}
