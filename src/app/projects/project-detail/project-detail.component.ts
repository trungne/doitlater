import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../task/task';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @Input() projectID!: string;

  project!: Project;

  todoTasks!: Task[];
  doingTasks!: Task[];
  doneTasks!: Task[];

  taskSubcription!: Subscription;
  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getProject();
  }
  
  ngOnDestroy(): void {
    this.taskSubcription.unsubscribe();
  }

  updateTaskLists(){
    this.todoTasks = this.project.tasks.filter(t => t.status === TaskStatus.Todo);
    this.doingTasks = this.project.tasks.filter(t => t.status === TaskStatus.Doing);
    this.doneTasks = this.project.tasks.filter(t => t.status === TaskStatus.Done);
  }

  getTasks(){
    this.taskSubcription = this.projectService.getTasks(this.project.id).subscribe(
      tasks => {
        this.project.tasks = tasks;
        this.updateTaskLists();
      }
    )
  }

  getProject(){
    if(!this.projectID){
      this.projectID = String(this.route.snapshot.paramMap.get('id'));
    }
    this.projectService.getProject(this.projectID)
    .subscribe(project => {
      this.project = project;
    });
    // wait for project ID before get tasks
    this.getTasks();

    
  }

  removeTask(taskID: string): void{
    const found = this.project.tasks.findIndex(t => t.id === taskID);
    if (found > -1){
      // remove task in database
      this.projectService.deleteTask(taskID);

      this.project.tasks.splice(found, 1);

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
      switch (containerID) {
        case "to-do-tasks":
          task.status = TaskStatus.Todo;
          break;
        case "doing-tasks":
          task.status = TaskStatus.Doing;
          break;
        case "done-tasks":
          task.status = TaskStatus.Done;
          break;
        default:
          break;
      }
      this.projectService.updateTaskStatus(task.id, task.status);
    }
  }
}
