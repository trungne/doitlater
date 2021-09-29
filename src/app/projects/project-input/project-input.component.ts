import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss']
})
export class ProjectInputComponent implements OnInit {
  inputBox?: any;
  inputNameField?: any;
  inputDescriptionField?: any;
  inputBoxShown = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.inputBox = document.querySelector("#project-input-box");
    this.inputNameField = this.inputBox.querySelector("#project-input-name");
    this.inputDescriptionField = this.inputBox.querySelector("#project-input-description");

    this.toggleInputBox(); // by default, input box is hidden
  }

  toggleInputBox(){
    this.inputBoxShown = !this.inputBoxShown;
    if(this.inputBoxShown){
      this.hideInputBox();
    }
    else{
      this.showInputBox();
    }

  }

  showInputBox(){
    this.inputBox.style.display = "block";
    this.inputNameField.focus();
  }

  hideInputBox(){
    this.inputBox.style.display = "none";
    this.inputNameField.value = "";
    this.inputDescriptionField.value = "";
  }

  add(name: string, description: string){
    // handle empty parameters
    name = name.trim();
    description = description.trim();
    if (!name || !description){
      // TODO: display error
      return;
    }

    this.projectService.addProject(name, description);
    this.hideInputBox();
  }

}
