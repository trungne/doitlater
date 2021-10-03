import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Nebular Imports
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

import {MegaMenuModule} from 'primeng/megamenu';
import { ProjectsModule } from './projects/projects.module';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeModule } from './home/home.module';

// Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


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
    
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    // Nebula Imports
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule, 

    MegaMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
