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
import {MegaMenuModule} from 'primeng/megamenu';

import { ProjectsModule } from './projects/projects.module'; // do not delete this!
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component'; // do not delete this!
import { HomeModule } from './home/home.module';

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
