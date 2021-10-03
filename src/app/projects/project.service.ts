import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './project';
import { Observable, of } from 'rxjs';
import { Task } from './task/task';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }

  

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProject(id: string): Observable<Project>{
    const project = PROJECTS.find(p => p.id === id)!;
    return of(project);
  }

  addProject(name: string, description: string): void{
    const newProject = new Project(name, description);
    PROJECTS.push(newProject);
  }

  deleteProject(id: string){
    const found = PROJECTS.findIndex(project => project.id === id);
    if (found > -1){
      PROJECTS.splice(found, 1);
    }
  }

  addTask(projectID: string, task: Task){    
    const found = PROJECTS.findIndex(project => project.id === projectID);
    if (found > -1){
      PROJECTS[found].addTask(task);
    }
  }

  removeTask(projectID: string, task: Task){
    const found = PROJECTS.findIndex(project => project.id === projectID);
    if (found > -1){
      PROJECTS[found].removeTask(task);
    }
  }
}