import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../types/user';
import { formatToMyDate } from '../../utils/formatDateTime';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  modalOptions!: NgbModalOptions;
  closeResult!: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  formatDate(date: String): String {
    return formatToMyDate(date);
  }

  deleteUserAction(userId: number): void {
    this.userService.deleteUser(userId).subscribe((result) => {
      if (result && result.code == 0) {
        this.toastr.success('Delele user success!');
        this.users = this.users.filter((user) => user.id != userId);
      } else {
        this.toastr.error('Delele user fail!');
      }
    });
  }

  open(content: any) {
    this.modalService.open(content, {
      ...this.modalOptions,
      size: 'lg',
      backdrop: 'static',
    });
  }

  createNewUserAction(data: any): void {
    this.userService
      .createUser({
        ...data,
        gender: data == 'Male' ? 1 : 0,
        birthday:
          new Date(data.birthday.year, data.birthday.month, data.birthday.day)
            .toISOString()
            .slice(0, 10) + ' 00:00:00',
      })
      .subscribe((result) => {
        if (result && result.code == 0) {
          this.toastr.success('Create user success!');
        } else {
          this.toastr.error('Create user fail!');
        }
      });
  }
}
