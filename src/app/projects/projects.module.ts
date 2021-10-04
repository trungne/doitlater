import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components Imports
import { ProjectsComponent } from './projects.component';
import { TaskComponent } from './task/task.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInputComponent } from './project-input/project-input.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskInputComponent } from './task-input/task-input.component';

// Nebular Imports
import { NbCardModule } from '@nebular/theme';

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


@NgModule({
  declarations: [
    ProjectsComponent,
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
    DragDropModule,

    // Nedular Imports
    NbCardModule,

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
    AccordionModule,
    MenuModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
