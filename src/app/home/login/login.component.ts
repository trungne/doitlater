import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;
  rememberUser: boolean = false;

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  validateInputFields(): boolean{
    if (!this.email || !this.password){
      this.messageService.clear();
      this.messageService.add({severity:'error', summary:'Invalid input', detail:'Please enter both email and password'});
      
      return false;
    }

    return true;
  }

  loginUser(){
    if(this.validateInputFields()){

      this.messageService.clear();
      this.authService.loginUser(this.email!, this.password!)
        .then((result) => {
          
          if (result == null) { // null means successful, ye it's weird, I know.
            this.router.navigate(['/home']);
          }
          else if (result.isInvalid == false) {
            this.messageService.add({severity:'error', summary:'Invalid account', detail:'The account does not exist.'});
          }
        })
    }
  }

  loginUserWithGoogle(){
    this.authService.googleSignin().then(
      () => this.router.navigate(['/home'])
    );
  }

}
