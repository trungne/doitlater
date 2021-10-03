import { Injectable } from '@angular/core';
import { PROJECTS } from '../projects/mock-projects';
import { Project } from '../projects/project';
import { Observable, of } from 'rxjs';
import { Task } from '../projects/task/task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase} from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private store: AngularFirestore) {
    
   }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProject(id: string): Observable<Project>{
    const project = PROJECTS.find(p => p.id === id)!;
    return of(project);
  }

  addProject(name: string, description: string): void{
    const newProject = new Project(name, description);
    let data;
    this.store.collection("projects").add({name: "Trung"});
    this.store.collection("projects").get().subscribe(d => {
      for (const doc of d.docs){
        console.log(doc.id);
        console.log(doc.get("title"));
      }
    });

    this.store.collection("projects").doc("C5iBSdfqHiXarDcBIZW6").get().subscribe(
      d => {
        data = d
        console.log(d.get("description"));
      }
      
    );
    
    PROJECTS.push(newProject);
  }

  deleteProject(id: string){
    const found = PROJECTS.findIndex(project => project.id === id);
    if (found > -1){
      PROJECTS.splice(found, 1);
    }
  }

  addTask(projectID: string, task: Task){    
    const found = PROJECTS.findIndex(project => project.id === projectID);
    if (found > -1){
      PROJECTS[found].addTask(task);
    }
  }

  removeTask(projectID: string, task: Task){
    const found = PROJECTS.findIndex(project => project.id === projectID);
    if (found > -1){
      PROJECTS[found].removeTask(task);
    }
  }
}