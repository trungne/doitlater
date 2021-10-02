import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../task/task';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  
})
export class ProjectDetailComponent implements OnInit {
  @Input() project!: Project;

  toDoTasksID = "to-do-tasks";
  doingTasksID = "doing-tasks";
  doneTasksID = "done-tasks";


  constructor() { }

  ngOnInit(): void {

  }

  private findTaskType(event: CdkDragDrop<Task[]>): number{
    const parentElement = event.container.element.nativeElement.parentElement;
    if (!parentElement){
      return -1;
    }
    console.log(parentElement)
    console.log(parentElement.id);
    console.log(this.doingTasksID);
    switch (parentElement.id) {
      case this.toDoTasksID:
        return TaskStatus.Todo;
      case this.doingTasksID:
        return TaskStatus.Doing;
      case this.doneTasksID:
        return TaskStatus.Done;
      default:
        return -1;
    }
  }
  drop(event: CdkDragDrop<Task[]>){
    const newStatus = this.findTaskType(event);
    console.log(event.item.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);  
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      event.item.data.status = newStatus;
    }
  }
}
