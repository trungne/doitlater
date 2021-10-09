import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

import { RouterModule } from '@angular/router';

// PrimeNg imports
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {PasswordModule} from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DividerModule,
    PasswordModule,
    RouterModule,
    MessagesModule,
    MessageModule,
    AvatarModule
  ]
})
export class HomeModule { }
