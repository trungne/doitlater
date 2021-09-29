import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../protect';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  @Input() project!: Project;
  @Output() deleteProjectEvent = new EventEmitter<string>(); // emit id (which is a string)
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  openProject(): void {
    // open project
  }

  deleteProject(): void {
    this.deleteProjectEvent.emit(this.project.id);
  }

}
