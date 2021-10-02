import { Task, TaskStatus } from "./task/task";

export class Project {
  private _id: string;
  private _name: string;
  private _description: string;

  private _todoTasks: Task[];
  private _doingTasks: Task[];
  private _doneTasks: Task[];

  constructor(id: string, name: string, description: string){
    this._id = id;
    this._name = name;
    this._description = description;
    
    this._todoTasks = [];
    this._doingTasks = [];
    this._doneTasks = [];
  }

  get id(){
    return this._id;
  }

  get name(){
    return this._name;
  }

  get description(){
    return this._description;
  }

  get tasks(){
    return [...this._todoTasks, ...this._doingTasks, ...this._doneTasks];
  }

  get toDoTasks(){
    return this._todoTasks;
  }

  get doingTasks(){
    return this._doingTasks;
  }

  get doneTasks(){
    return this._doneTasks
  }

  // return a task list according to task status
  private findTaskList(status: TaskStatus): Task[]{
    switch (status) {
      case TaskStatus.Doing:
        return this._doingTasks;

      case TaskStatus.Done:
        return this._doneTasks;

      default:
        return this._todoTasks;
    }
  }

  addTask(task: Task){
    const tasklist = this.findTaskList(task.status);
    tasklist.push(task);
  }

  removeTask(task: Task){
    const tasklist = this.findTaskList(task.status);
    const found = tasklist.findIndex(t => t.id === task.id);
    if (found > -1){
      tasklist.splice(found, 1);
    }
  }

  
}