import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../protect';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  @Input() public project!: Project;
  constructor(
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  openProject(): void {
    this.router.navigate([`/projects/${this.project.id}`])
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.project.id);
  }

}
