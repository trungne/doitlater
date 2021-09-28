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
import { ProjectMenuModule } from './project-menu/project-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProjectMenuModule,
    // Nebula Imports
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),

    NbButtonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
