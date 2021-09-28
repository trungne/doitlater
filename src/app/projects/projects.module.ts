import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { ProjectMenuComponent } from './project-menu/project-menu.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectMenuComponent
  ],
  imports: [
    CommonModule,
    NbSidebarModule,
    NbMenuModule,
    NbCardModule,
    NbLayoutModule
  ],
  exports: [
    ProjectsComponent,
    ProjectMenuComponent
  ]
})
export class ProjectsModule { }
