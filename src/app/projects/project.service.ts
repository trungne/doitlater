import { Injectable } from '@angular/core';
import { Project } from './protect';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }

  addProject(project: Project): void{
    this.projects.push(project);
  }

  deleteProject(id: number){
    const foundId = this.projects.findIndex(project => project.id === id)
    if (foundId){
      this.projects.slice(foundId, 1);
    }
  }
}