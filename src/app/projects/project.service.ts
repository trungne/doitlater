import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './project';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }

  generateId(): string{
    const randomNum: string = (Math.random()*10).toFixed(5).replace('.', '');
    const time: number = Date.now();
    const id = `${randomNum}-project-${time}`.replace('.', '');
    return id;
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProject(id: string): Observable<Project>{
    const project = PROJECTS.find(p => p.id === id)!;
    return of(project);
  }

  addProject(name: string, description: string): void{
    const id = this.generateId();
    const newProject = new Project(id, name, description);
    PROJECTS.push(newProject);
  }

  deleteProject(id: string){
    const found = PROJECTS.findIndex(project => project.id === id);
    if (found > -1){
      PROJECTS.splice(found, 1);
    }
    
  }
}