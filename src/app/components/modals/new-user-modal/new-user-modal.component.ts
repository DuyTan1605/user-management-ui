import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Validator } from '../../../utils/validators';

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
    private validatorService: Validator
  ) {}

  ngOnInit(): void {
    this.createNewUser = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        this.validatorService.validateUserName,
      ]),
      name: new FormControl('', [
        Validators.required,
        this.validatorService.validateName,
      ]),
      birthday: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        this.validatorService.validatePassword,
      ]),
    });
  }

  onSubmit() {
    this.createNewUserAction.emit(this.createNewUser.value);
    this.closeModal.emit();
    this.createNewUser.reset();
  }
}
