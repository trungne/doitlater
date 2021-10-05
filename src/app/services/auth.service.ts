import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedin: boolean;
  currentUser: any;

  constructor(private router: Router, private afAuth: AngularFireAuth) { 
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

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then( () => {
        // display success message
        this.router.navigate(['/home']);


        // this.currentUser = this.afAuth.currentUser
        // .then((user) => {

        // })
        

        // initialize user object here
        this.afAuth.user.subscribe(user => {
          this.currentUser = user;
        })
      })
      .catch(error => {
        // display error

        if (error.code){
          return { isValid: false, message: error.message };
        }

        return {isValid: false};
      })
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
