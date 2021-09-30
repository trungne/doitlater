export class Task {
    private _description: string;
    private _id: string;

    constructor(description: string){
        this._description = description;
        this._id = this.generateTaskID();
    }

    generateTaskID(): string {
        const randomNum: string = (Math.random()*10).toFixed(5).replace('.', '');
        const time: number = Date.now();
        const id = `${randomNum}-task-${time}`.replace('.', '');
        return id;
    }


    get description(){
        return this._description;
    }

    get id(){
        return this._id;
    }

}