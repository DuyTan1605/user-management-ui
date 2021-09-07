import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../types/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
}