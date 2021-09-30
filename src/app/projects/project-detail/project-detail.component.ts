import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Task } from '../task/task';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [MessageService]
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  public project!: Project;
  public taskInputField: any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProject();
    
  }

  ngAfterViewInit(){
    this.taskInputField = document.querySelector("#task-input-field");
    this.taskInputField.focus();
  }

  addTask(description: string){
    description = description.trim();
    if (!description){
      this.addWarning("Doing nothing is not quite a task, right?");
      return;
    }
    const newTask = new Task(description);
    this.project.addTask(newTask);
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

  addWarning(message: string){
    const warning = document.querySelector(".p-message");
    if (warning){
      this.messageService.clear();
    }
    this.messageService.add({severity:'warn', summary:'Invalid Input', detail: message});
  }

}
