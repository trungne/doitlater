import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../protect';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  @Input() project!: Project;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  openProject(): void {
    console.log("open");
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.project.id);
  }

}
