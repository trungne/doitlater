import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../task/task';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {
  @Input() project!: Project;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.project){
      this.getProject();
    }
  }

  getProject(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(project => this.project = project);

  }

  drop(event: CdkDragDrop<Task[]>){
    if(event.container.element.nativeElement.classList.contains("delete-box")){
      const task = event.item.data;
      if (!task){
        return;
      }

      this.projectService.removeTask(this.project.id, task);
      return;
    }
    
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const containerID = event.container.element.nativeElement.parentElement?.id;
      switch (containerID) {
        case "to-do-tasks":
          event.item.data.status = TaskStatus.Todo;
          break;
        case "doing-tasks":
          event.item.data.status = TaskStatus.Doing;
          break;
        case "done-tasks":
          event.item.data.status = TaskStatus.Done;
          break;
        default:
          break;
      }
    }
  }
}
