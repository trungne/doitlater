import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { Task, TaskStatus } from '../task/task';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  providers: [MessageService]
})
export class TaskInputComponent implements OnInit {
  @Input() projectID!: string;
  @Output() taskAddedEvent = new EventEmitter<string>();
  
  private taskInputField: any;
  // private taskInputLabel: any;

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.taskInputField = document.getElementById("task-input-field");
    this.taskInputField.focus();
  }

  addTask(taskDescription: string){
    if (!taskDescription || !taskDescription.trim()){
      this.addWarning("Doing nothing is not quite a task, right?");
      return;
    }

    taskDescription = taskDescription.trim();

    const newTask = {
      id: this.projectService.genID(),
      description: taskDescription,
      projectID: this.projectID,
      status: TaskStatus.Todo
    } as Task;

    this.projectService.addTask(newTask);
    this.taskInputField.value = "";
    this.messageService.clear();

    this.taskAddedEvent.emit();

  }

  addWarning(message: string){
    const warning = document.querySelector(".p-message");
    if (warning){
      this.messageService.clear();
    }
    this.messageService.add({severity:'warn', summary:'Invalid Input', detail: message});
  }
}
