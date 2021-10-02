import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: "projects", component: ProjectsComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "projects/:id", component: ProjectDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
