export class Project {
  _id: string;
  _name: string;
  _description: string;

  constructor(id: string, name: string, description: string){
    this._id = id;
    this._name = name;
    this._description = description;
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
}