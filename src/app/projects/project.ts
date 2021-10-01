import { Task, TaskStatus } from "./task/task";

export class Project {
  private _id: string;
  private _name: string;
  private _description: string;
  private _tasks: Task[];

  constructor(id: string, name: string, description: string){
    this._id = id;
    this._name = name;
    this._description = description;
    this._tasks = [];
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
    return this._tasks;
  }

  get toDoTasks(){
    console.log("todotasks called")
    return this._tasks.filter(t => t.status === TaskStatus.Todo);
  }

  get doingTasks(){
    return this._tasks.filter(t => t.status === TaskStatus.Doing);
  }

  get doneTasks(){
    return this._tasks.filter(t => t.status === TaskStatus.Done);
  }

  addTask(task: Task){
    this._tasks.push(task);
    console.log(this._tasks);
  }

  removeTask(task: Task){
    this._tasks = this._tasks.filter(t => t.id !== task.id)
  }

  
}