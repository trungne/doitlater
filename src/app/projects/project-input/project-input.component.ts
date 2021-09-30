import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss'],
  providers: [MessageService]
})
export class ProjectInputComponent implements OnInit {
  private inputBox?: any;
  private inputNameField?: any;
  private inputDescriptionField?: any;
  private inputBoxShown = false;

  constructor(private projectService: ProjectService,
              private messageService: MessageService) { }

  addWarning(message: string){
    const warning = document.querySelector(".p-message");
    if (warning){
      this.messageService.clear();
    }
    this.messageService.add({severity:'warn', summary:'Invalid Input', detail: message});
  }

  ngOnInit(): void {
    this.inputBox = document.querySelector("#project-input-box");
    this.inputNameField = this.inputBox.querySelector("#project-input-name");
    this.inputDescriptionField = this.inputBox.querySelector("#project-input-description");

    this.hideInputBox(); // by default, input box is hidden
  }

  toggleInputBox(){
    if(this.inputBoxShown){
      this.hideInputBox();
    }
    else{
      this.showInputBox();
    }
  }

  showInputBox(){
    this.inputBoxShown = true;
    this.inputBox.style.display = "block";
    this.inputNameField.focus();
  }

  hideInputBox(){
    this.inputBoxShown = false;
    this.inputBox.style.display = "none";
    this.inputNameField.value = "";
    this.inputDescriptionField.value = "";
  }

  add(name: string, description: string){
    // handle empty parameters
    name = name.trim();
    description = description.trim();
    if (!name || !description){
      const message = (!name? "Title " : "Description ")
      this.addWarning(message + "should not be empty");
      return;
    }

    this.projectService.addProject(name, description);
    this.hideInputBox();
  }
}
