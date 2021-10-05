import { Injectable, OnInit } from '@angular/core';
import { PROJECTS } from '../projects/mock-projects';
import { Project } from '../projects/project';
import { Observable, of } from 'rxjs';
import { Task } from '../projects/task/task';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  private projectsCollectionRef: AngularFirestoreCollection<Project>;

  constructor(private store: AngularFirestore) {
    this.projectsCollectionRef = this.store.collection("projects");
  }
  ngOnInit(){
    
  }

  getTasks(projectID: string): Observable<any> {
    const tasksCollectionRef = this.store.collection("tasks", ref => ref.where('projectID', '==', projectID));
    return tasksCollectionRef.valueChanges({idField: "id"});
  }

  getProjects(): Observable<Project[]> {
    return this.projectsCollectionRef.valueChanges({idField: "id"});
  }

  getProject(id: string): Observable<Project>{
    const project = PROJECTS.find(p => p.id === id)!;
    return of(project);
  }

  createProject(title: string, description: string): Project{
    return {
      id: this.generateId(),
      title: title,
      description: description,
      tasks: []
    } as Project
  }

  generateId(): string{
    const randomNum: string = (Math.random()*10).toFixed(5).replace('.', '');
    const time: number = Date.now();
    const id = `${randomNum}-project-${time}`.replace('.', '');
    return id;
  }

  addProject(title: string, description: string): void{
    PROJECTS.push(this.createProject(title, description))
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
      PROJECTS[found].tasks.push(task);
    }
  }

  removeTask(projectID: string, task: Task){
    const found = PROJECTS.findIndex(project => project.id === projectID);
    if (found === -1){
      return;
    }

    const foundTask = PROJECTS[found].tasks.findIndex(t => t.id === task.id)
    if (foundTask === -1){
      return;
    }
    console.log();
    PROJECTS[found].tasks.splice(foundTask, 1);
  }
}