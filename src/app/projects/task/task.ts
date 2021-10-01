export enum TaskStatus {
    Todo = 0,
    Doing = 1,
    Done = 2,
}

export class Task {
    private _description: string;
    private _id: string;
    private _status: TaskStatus;
    
    constructor(description: string){
        this._description = description;
        this._id = this.generateTaskID();
        this._status = TaskStatus.Todo // by default, a task is to-do when it's first created
    }

    generateTaskID(): string {
        const randomNum: string = (Math.random()*10).toFixed(5).replace('.', '');
        const time: number = Date.now();
        const id = `${randomNum}-task-${time}`.replace('.', '');
        return id;
    }

    set status(status: TaskStatus){
        this._status = status;
    }

    get description(){
        return this._description;
    }

    get id(){
        return this._id;
    }

    get status(){
        return this._status;
    }
}