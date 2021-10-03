import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../project';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  providers: [ConfirmationService]
})
export class ProjectOverviewComponent implements OnInit {
  @Input() public project!: Project;
  header = "header";
  items!: MenuItem[];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Expand',
        icon: 'pi pi-desktop',
        command: () => {
          this.router.navigate([`/projects/${1}`]);
        }
        
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.deleteProject();
        }
      }
    ]
  }

  
  deleteProject() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.projectService.deleteProject(this.project.id);
        }
    });
  }
}
