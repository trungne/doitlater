import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectMenuComponent } from './project-menu.component';
import { NbCardModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';



@NgModule({
  imports: [
    CommonModule,
    NbSidebarModule,
    NbMenuModule,
    NbCardModule,
  ],
  declarations: [ProjectMenuComponent],
  exports: [
    ProjectMenuComponent
  ]
})
export class ProjectMenuModule { }
