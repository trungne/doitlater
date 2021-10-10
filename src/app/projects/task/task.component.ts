import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from './task';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @ViewChild('description') description!: any;
  
  editTaskDialogDisplayed: boolean = false;
  loading: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }
  showDialog(){
    this.description.nativeElement.value = this.task.description;
    this.editTaskDialogDisplayed = true;
  }

  closeDialog(){
    this.editTaskDialogDisplayed = false;
  }

  editTask(){
    if (!this.description.nativeElement.value){
      this.closeDialog();  
      return;
    }
    this.task.description = this.description.nativeElement.value;
    this.projectService.editTask(this.task.id, this.description.nativeElement.value).then(
      () => {
        this.closeDialog();
        this.loading = false;
      }
    );
    this.loading = true;
    // disable dialog
    
  }

}
