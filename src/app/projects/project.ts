import { Task } from "./task/task";

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

  addTask(task: Task){
    this._tasks.push(task);    
  }

  removeTask(task: Task){
    this._tasks = this._tasks.filter(t => t.id !== task.id)
  }
}