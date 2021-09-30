import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsComponent } from './projects.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInputComponent } from './project-input/project-input.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskComponent } from './task/task.component';

// PrimeNg Imports
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectMenuComponent,
    ProjectListComponent,
    ProjectInputComponent,
    ProjectOverviewComponent,
    ProjectDetailComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,

    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,

    // PrimeNG improts
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
