import { Injectable, OnInit } from '@angular/core';
import { PROJECTS } from '../projects/mock-projects';
import { Project } from '../projects/project';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from '../projects/task/task';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  private projectsCollectionRef: AngularFirestoreCollection;
  private tasksCollectionRef: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) {
    this.projectsCollectionRef = this.store.collection("projects");
    this.tasksCollectionRef = this.store.collection("tasks");
  }
  ngOnInit(){
    
  }

  

  getProjects(): Observable<any> {
    return this.projectsCollectionRef.valueChanges({idField: "id"});
  }

  getProject(id: string): Observable<any> {
    console.log(id);
    return this.store.doc(`projects/${id}`).valueChanges({idField: "id"});
  }

  addProject(title: string, description: string): void{
    this.projectsCollectionRef.add(
      {
        title: title,
        description: description
      }
    )
  }

  deleteProject(id: string){
    this.store.doc(`projects/${id}`).delete();
  }

  getTasks(projectID: string): Observable<any> {
    const tasksCollectionRef = this.store.collection("tasks", ref => ref.where('projectID', '==', projectID));
    return tasksCollectionRef.valueChanges({idField: "id"});
  }

  addTask(projectID: string, description: string, status: TaskStatus): void{    
    this.tasksCollectionRef.add(
      {
        projectID: projectID,
        description: description,
        status: status
      }
    )
  }

  updateTaskStatus(taskID: string, newStatus: TaskStatus) {
    const taskRef = this.store.doc(`tasks/${taskID}`);
    return taskRef.update({
      status: newStatus
    })
  }

  deleteTask(taskID: string): Promise<void>{
    const taskRef = this.store.doc(`tasks/${taskID}`);
    return taskRef.delete();
  }

}