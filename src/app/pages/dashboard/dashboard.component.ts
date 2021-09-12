import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getTotalUsers();
  }

  getTotalUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.totalUsers = users.length;
    });
  }
}
