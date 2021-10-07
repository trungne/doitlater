import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth"
import { of } from 'rxjs';
import {switchMap } from 'rxjs/operators';
import { User } from './user';
@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  userLoggedin: boolean;
  currentUser: any;

  constructor(private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    this.currentUser = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    )

    this.userLoggedin = false;

    this.afAuth.onAuthStateChanged(user => {
      if(user){
        this.userLoggedin = true;
      }
      else{
        this.userLoggedin = false;
      }
    })
    
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

  updateUserData(user: any) {
    if (!user){
      return;
    }
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
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

        // initialize user object here
        this.afAuth.user.subscribe(user => this.currentUser = user);
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
