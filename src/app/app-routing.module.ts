import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "projects", component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "about", component: AboutComponent},
  {path: "projects/:id", component: ProjectDetailComponent, canActivate: [AuthGuard]},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "**", component: HomeModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
