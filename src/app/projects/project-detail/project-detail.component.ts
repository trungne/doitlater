import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../protect';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public project: Project | undefined;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(
      project => this.project = project
    );
  }

  goBack(): void {
    this.location.back();
  }

}
