import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './protect';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = PROJECTS;
  constructor() { }

  // getProjects(): Observable<Project[]> {
  //   const projects = of(PROJECTS);
  //   return projects;
  // }

  getProjects(): Project[] {
    return this.projects;
  }

  addProject(project: Project): void{
    
  }

  deleteProject(id: string){
    this.projects = this.projects.filter(project => project.id !== id);  
  }
}