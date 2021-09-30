import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  providers: [ConfirmationService]
})
export class ProjectOverviewComponent implements OnInit {
  @Input() public project!: Project;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }
  
  deleteProject() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.projectService.deleteProject(this.project.id);
        }
    });
}

  openProject(): void {
    this.router.navigate([`/projects/${this.project.id}`])
  }
}
