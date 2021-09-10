import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  @Input() userId?: string;
  @Output() deleteUser = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  deleteUserAction(): void {
    this.deleteUser.emit();
  }
}
