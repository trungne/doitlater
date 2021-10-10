import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth"
import { Observable, of } from 'rxjs';
import {switchMap } from 'rxjs/operators';
import { User } from './user';
@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  // userLoggedin: boolean = false;
  userObservable!: Observable<User> | Observable<any>;
  currentUser!: User

  constructor(private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    this.userObservable = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){

          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    )

  
    // this.afAuth.onAuthStateChanged(user => {
    //   if(user){
    //     this.userLoggedin = true;
    //   }
    //   else{
    //     this.userLoggedin = false;
    //   }
    // })
    
  }
  
  getCurrentUser(): Observable<any>{
    return this.userObservable;
  }

  async googleSignin() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    } catch (error: any){
      console.log(error.message)
    }
  }

  logout() {
    return this.afAuth.signOut();
  }

  updateUserData(user: firebase.default.User | null) {
    if (!user){
      return;
    }
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true});
  }


  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then( () => {
        // display success message
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.code);
        return { isValid: false, message: error.message };
      }
      )
  }

  signupUser(email: string, password: string): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                let emailLower = email.toLowerCase();
                const user = result.user;
                
                // immediately send the user a verification email
                if (user){
                  user.sendEmailVerification();                   
                }
            })
            .catch(error => {
                console.log('Auth Service: signup error', error);
                if (error.code){
                  return { isValid: false, message: error.message };
                }
                    
                return {isValid: false};
            });
    }

}
