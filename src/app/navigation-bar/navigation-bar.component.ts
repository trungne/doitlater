import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']

})
export class NavigationBarComponent implements OnInit {
  items!: MegaMenuItem[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.navigateTo('/home');
        }
      },
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.navigateTo('/projects');
        }
      },
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-exclamation-circle',
        command: () => {
          this.navigateTo('/about');
        }
      }
    ]
  }

  navigateTo(path: string){
    this.router.navigate([path]);
  }

}
