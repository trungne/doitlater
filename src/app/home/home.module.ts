import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {DragDropModule} from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    PanelModule
  ]
})
export class HomeModule { }
