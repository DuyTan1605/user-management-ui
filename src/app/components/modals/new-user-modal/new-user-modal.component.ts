import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  validateUserName,
  validateName,
  validatePassword,
} from '../../../utils/validators';

import { UserService } from '../../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
})
export class NewUserModalComponent implements OnInit {
  @Output() createNewUserAction = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  createNewUser!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createNewUser = this.formBuilder.group({
      username: new FormControl('', [Validators.required, validateUserName]),
      name: new FormControl('', [Validators.required, validateName]),
      birthday: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, validatePassword]),
    });
  }

  onSubmit() {
    this.createNewUserAction.emit(this.createNewUser.value);
    this.closeModal.emit();
    this.createNewUser.reset();
  }
}
