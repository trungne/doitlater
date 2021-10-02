import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Nebular Imports
import { NbCardModule, 
  NbInputModule } from '@nebular/theme';

// PrimeNg Imports
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {MenuModule} from 'primeng/menu';

import { NbThemeModule, 
  NbLayoutModule, 
  NbButtonModule, 
  NbTabsetModule,
  NbBadgeModule,
  NbMenuModule,
  NbSidebarModule} from '@nebular/theme';
  
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule, 
    NbButtonModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbBadgeModule,

    // ButtonModule,
    // InputTextModule,
    // MessagesModule,
    // MessageModule,
    // ConfirmDialogModule,
    // CheckboxModule,
    // PanelModule,
    // ToastModule,
    // AccordionModule,
    // CardModule,
    // MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
