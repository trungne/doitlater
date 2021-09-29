import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbThemeModule, 
  NbLayoutModule, 
  NbButtonModule, 
  NbTabsetModule,
  NbBadgeModule,
  NbMenuModule,
  NbSidebarModule } from '@nebular/theme';
  
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ProjectsModule } from './projects/projects.module';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    // These components have access to AppModule imports
    AppComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,

    // Nebula Imports
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule, 
    NbButtonModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
