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
  private projectsCollectionRef: AngularFirestoreCollection<Project>;
  private tasksCollectionRef: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) {
    this.projectsCollectionRef = this.store.collection("projects");
    this.tasksCollectionRef = this.store.collection("tasks");
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
      id: this.generateID(),
      title: title,
      description: description,
      tasks: []
    } as Project
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

  generateID(){
    return this.store.createId();
  }

  addTask(task: Task): void{    
    this.tasksCollectionRef.add(
      {
        projectID: task.projectID,
        description: task.description,
        status: task.status
      }
    )
  }

  updateTaskStatus(taskID: string, newStatus: TaskStatus) {
    const taskRef = this.store.doc(`tasks/${taskID}`);
    return taskRef.update({
      status: newStatus
    })
  }

  removeTask(taskID: string): Promise<void>{
    const taskRef = this.store.doc(`tasks/${taskID}`);
    return taskRef.delete();
  }

}