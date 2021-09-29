import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../protect';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void{
    this.projects = this.projectService.getProjects();
  }

  // implement a better way to delete project
  deleteProject(id: string){
    this.projects = this.projects.filter(project => project.id !== id);  
    this.projectService.deleteProject(id);
  }

}
