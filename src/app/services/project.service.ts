import { Injectable, OnInit } from '@angular/core';
import { Project } from '../projects/project';
import { empty, EMPTY, Observable, of } from 'rxjs';
import { Task, TaskStatus } from '../projects/task/task';
import { AngularFirestore, 
} from '@angular/fire/compat/firestore';
import { Firestore, arrayUnion, arrayRemove } from '@angular/fire/firestore';

import { User } from './user';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  userID!: string;
  constructor(private store: AngularFirestore, private authService: AuthService) {

  }
  ngOnInit(){
    
  }

  genID(): string {
    return this.store.createId();
  }
  /** CRUD operations for Project **/
  getProjects(): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user.projects && user.projects.length > 0){
          return this.store.collection("projects", ref => ref.where("id", "in", user.projects)).valueChanges();
        }
        else{
          return of([]);
        }
      })
    )
  }

  getProject(id: string): Observable<any> {
    //TODO: for security reason, check if project id is in current user project list
    return this.store.doc(`projects/${id}`).valueChanges();
  }

  addProject(project: Project): Promise<void>{
    this.authService.getCurrentUser().pipe(take(1)).subscribe(
      user => {
        const ref = this.store.doc(`users/${user.uid}`);
        if(!user.projects){
          ref.set({projects: [project.id]}, {merge: true});
        }
        else{
          ref.update({
            projects: arrayUnion(project.id)
          })
        }

      }
    )

    return this.store.doc(`projects/${project.id}`)
      .set(project, {merge: true});
  }

  deleteProject(id: string): Promise<void> {
    // delete tasks first
    this.deleteTasks(id);
    this.authService.getCurrentUser().pipe(take(1)).subscribe(
      user => {
        this.store.doc(`users/${user.uid}`).update({
          projects: arrayRemove(id)
        })
      }
      )

    
    return this.store.doc(`projects/${id}`)
      .delete();
  }

  /** CRUD operations for Task **/
  getTasks(projectID: string): Observable<any> {
    const tasksCollectionRef = this.store
      .collection("tasks", ref => ref.where('projectID', '==', projectID));
    
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