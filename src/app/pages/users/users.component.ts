import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/User';
import { DateTimeFormater } from '../../utils/datetime-formatter';
import { Gender } from '../../entities/Gender';
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
    private modalService: NgbModal,
    private dateTimeService: DateTimeFormater
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  formatDate(date: String): String {
    return this.dateTimeService.formatToDisplayDate(date);
  }

  deleteUserAction(userId: number): void {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe((result) => {
      if (result) {
        this.users = this.users.filter((user) => user.id != userId);
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
        gender:
          data.gender == Gender[Gender.Male] ? Gender.Male : Gender.Female,
        birthday: this.dateTimeService.formatToApiDate(data.birthday),
      })
      .subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      });
  }
}
