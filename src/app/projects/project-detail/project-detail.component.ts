import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../task/task';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {
  @Input() project!: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {

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
    }
  }
}
