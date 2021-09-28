import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { NbAccordionModule, NbButton, NbButtonModule, NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInputComponent } from './project-input/project-input.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectMenuComponent,
    ProjectListComponent,
    ProjectInputComponent,
    ProjectOverviewComponent
  ],
  imports: [
    CommonModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
  ],
  exports: [
    ProjectsComponent,
    ProjectMenuComponent
  ]
})
export class ProjectsModule { }
