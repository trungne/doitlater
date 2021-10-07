import { Injectable, OnInit } from '@angular/core';
import { PROJECTS } from '../projects/mock-projects';
import { Project } from '../projects/project';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from '../projects/task/task';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { User } from './user';


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

  genID(): string {
    return this.store.createId();
  }
  /** CRUD operations for Project **/
  getProjects(): Observable<any> {
    return this.projectsCollectionRef.valueChanges();
  }

  getProject(id: string): Observable<any> {
    this.store.collection("tasks", ref => ref.where("projectID", "==", id)).get().toPromise().then(
      (result) =>{
        for (const doc of result.docs){
          console.log(doc.get("description"));
        }
      }
    )
    


    return this.store.doc(`projects/${id}`).valueChanges();

  }

  addProject(project: Project): Promise<void>{
    return this.store.doc(`projects/${project.id}`)
      .set(project, {merge: true});
  }

  deleteProject(id: string): Promise<void> {
    // delete tasks first
    this.deleteTasks(id);
    
    return this.store.doc(`projects/${id}`)
      .delete();
  }

  /** CRUD operations for Task **/
  getTasks(projectID: string): Observable<any> {
    const tasksCollectionRef = this.store.collection("tasks", ref => ref.where('projectID', '==', projectID));
    return tasksCollectionRef.valueChanges();
  }

  addTask(task: Task): Promise<void> {
    return this.store.doc(`tasks/${task.id}`)
      .set(task, {merge: true});
  }

  updateTaskStatus(taskID: string, newStatus: TaskStatus) {
    return this.store.doc(`tasks/${taskID}`).update({
      status: newStatus
    })
  }

  deleteTask(taskID: string): Promise<void>{
    const taskRef = this.store.doc(`tasks/${taskID}`);
    return taskRef.delete();
  }

  deleteTasks(projectID: string): void{
    this.store.collection("tasks", ref => ref.where("projectID", "==", projectID))
    .get().toPromise()
    .then(
      (result) =>{
        for (const doc of result.docs){
          doc.ref.delete();
        }
      }
    )
  }
}