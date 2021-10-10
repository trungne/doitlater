import { Injectable, OnInit } from '@angular/core';
import { Project } from '../projects/project';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from '../projects/task/task';
import { AngularFirestore, 
} from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove, writeBatch } from '@angular/fire/firestore';

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
        console.log(user);
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
    // delete all tasks of the project
    this.deleteTasks(id);

    // remove the project ID from the current user project ID list
    this.authService.getCurrentUser().pipe(take(1)).subscribe(
      user => {
        this.store.doc(`users/${user.uid}`).update({
          projects: arrayRemove(id)
        })
      }
      )

    // delete the project in projects database
    return this.store.doc(`projects/${id}`)
      .delete();
  }

  /** CRUD operations for Task **/
  getTasks(projectID: string): Observable<any> {
    return this.store
    .collection("tasks", ref => ref.where('projectID', '==', projectID))
    .valueChanges();
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
    return this.store.doc(`tasks/${taskID}`).delete();
  }

  async deleteTasks(projectID: string): Promise<void> {
    const batch = this.store.firestore.batch();
    
    const collection = await this.store
      .collection("tasks", ref => ref.where("projectID", "==", projectID))
      .get().toPromise();

    for (const doc of collection.docs){
      batch.delete(doc.ref);
    }

    return batch.commit()
  }

  editTask(taskID: string, newDescription: string): Promise<void>{
    return this.store.doc(`tasks/${taskID}`).update(
      {description: newDescription}
    )
  }
}