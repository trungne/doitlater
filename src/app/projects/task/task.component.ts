import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss', '../../../../node_modules/primeflex/primeflex.css'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  desp!: string;

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(){

  }

  addTask(){
    
  }

}
