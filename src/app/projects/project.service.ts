import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './protect';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }

  // getProjects(): Observable<Project[]> {
  //   const projects = of(PROJECTS);
  //   return projects;
  // }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  addProject(project: Project): void{
    
  }

  deleteProject(id: string){
    const found = PROJECTS.findIndex(project => project.id === id);
    if (found > -1){
      PROJECTS.splice(found, 1);
    }
    
  }
}