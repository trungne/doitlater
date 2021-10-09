import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: User
  constructor(private authService: AuthService) {
    console.log("user component created");
  }
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => this.user = user
    )
  }

}
