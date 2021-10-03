import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Nebular Imports
import { NbThemeModule, 
  NbLayoutModule, 
  } from '@nebular/theme';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDvaUyYRLYIhJGAZCINvcH250Af3JbRjLI",
  authDomain: "doitlater-trungne.firebaseapp.com",
  projectId: "doitlater-trungne",
  storageBucket: "doitlater-trungne.appspot.com",
  messagingSenderId: "461690873918",
  appId: "1:461690873918:web:a16432ee3e6d1e7706896f",
  measurementId: "G-9ZTKW9X7XB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import {MegaMenuModule} from 'primeng/megamenu';
import { ProjectsModule } from './projects/projects.module'; // do not delete this!
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component'; // do not delete this!
import { HomeModule } from './home/home.module';



const config = {
  apiKey: "AIzaSyDvaUyYRLYIhJGAZCINvcH250Af3JbRjLI",
  authDomain: "doitlater-trungne.firebaseapp.com",
  projectId: "doitlater-trungne",
  storageBucket: "doitlater-trungne.appspot.com",
  messagingSenderId: "461690873918",
  appId: "1:461690873918:web:a16432ee3e6d1e7706896f",
  measurementId: "G-9ZTKW9X7XB"
};



@NgModule({
  declarations: [
    // These components have access to AppModule imports
    AppComponent,
    NavigationBarComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HomeModule,
    ProjectsModule,
    
    

    // Nebula Imports
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule, 

    MegaMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
