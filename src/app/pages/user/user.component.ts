import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../entities/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeFormater } from '../../utils/datetime-formatter';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Validator } from '../../utils/validators';
import { ToastrService } from 'ngx-toastr';
import { Gender } from '../../entities/Gender';

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
    private toastr: ToastrService,
    private dateTimeService: DateTimeFormater,
    private validatorService: Validator
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
      if (user) {
        const myDate = new Date(user.birthday.toString());
        this.editUser = this.formBuilder.group({
          username: new FormControl(user.userName, [
            Validators.required,
            this.validatorService.validateUserName,
          ]),
          name: new FormControl(user.name, [
            Validators.required,
            this.validatorService.validateName,
          ]),
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
      }
    });
  }

  formatDate(date: String): String {
    return this.dateTimeService.formatToDisplayDate(date);
  }

  backToUsers() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.userService
      .updateUser({
        ...this.editUser.value,
        gender:
          this.editUser.value.gender == Gender[Gender.Male]
            ? Gender.Male
            : Gender.Female,
        id: Number(this.route.snapshot.paramMap.get('id')),
        birthday: this.dateTimeService.formatToApiDate(
          this.editUser.value.birthday
        ),
      })
      .subscribe();
  }
}
