import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInputComponent } from './project-input/project-input.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TaskComponent } from './task/task.component';

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
import { TaskInputComponent } from './task-input/task-input.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectMenuComponent,
    ProjectListComponent,
    ProjectInputComponent,
    ProjectOverviewComponent,
    TaskComponent,
    TaskInputComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

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
    CheckboxModule,
    PanelModule,
    ToastModule,
    CardModule,
    AccordionModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
