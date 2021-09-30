import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  public project!: Project;
  public taskInputField: any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProject();
    
  }

  ngAfterViewInit(){
    this.taskInputField = document.querySelector("#task-input-field");
    this.taskInputField.focus();
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
