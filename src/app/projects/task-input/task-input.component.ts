import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  providers: [MessageService]
})
export class TaskInputComponent implements OnInit {
  @Input() projectID!: string;
  private taskInputField: any;
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.taskInputField = document.querySelector("#task-input-field");
    this.taskInputField.focus();
  }

  addTask(description: string){
    description = description.trim();
    if (!description){
      this.addWarning("Doing nothing is not quite a task, right?");
      return;
    }
    const newTask = new Task(description);
    this.projectService.addTask(this.projectID, newTask);
    this.taskInputField.value = "";
  }

  addWarning(message: string){
    const warning = document.querySelector(".p-message");
    if (warning){
      this.messageService.clear();
    }
    this.messageService.add({severity:'warn', summary:'Invalid Input', detail: message});
  }
}
