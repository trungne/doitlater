import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from './task';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteTaskEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(){
    this.deleteTaskEvent.emit(this.task.id);
  }
}
