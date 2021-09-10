import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../types/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatToMyDate, formatToApiDate } from '../../utils/formatDateTime';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { validateUserName, validateName } from '../../utils/validators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user?: User;
  model?: NgbDateStruct;
  editUser!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => {
      const myDate = new Date(user.birthday.toString());
      this.user = user;

      this.editUser = this.formBuilder.group({
        username: new FormControl(user.userName, [
          Validators.required,
          validateUserName,
        ]),
        name: new FormControl(user.name, [Validators.required, validateName]),
        birthday: new FormControl(
          {
            year: myDate.getFullYear(),
            month: myDate.getMonth() + 1,
            day: myDate.getDate(),
          },
          [Validators.required]
        ),
        gender: new FormControl(user.gender, [Validators.required]),
      });
    });
  }

  formatDate(date: String): String {
    return formatToMyDate(date);
  }

  backToUsers() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.userService
      .updateUser({
        ...this.editUser.value,
        gender: this.editUser.value.gender == 'Male' ? 0 : 1,
        id: Number(this.route.snapshot.paramMap.get('id')),
        birthday: formatToApiDate(this.editUser.value.birthday),
      })
      .subscribe((result) => {
        if (result && result.code == 0) {
          this.toastr.success('Update user success!');
        } else {
          this.toastr.error('Update user fail!');
        }
      });
  }
}
