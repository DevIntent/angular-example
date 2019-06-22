import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-code-confirmation-dialog',
  templateUrl: './code-confirmation.dialog.html',
  styleUrls: ['./code-confirmation.dialog.scss']
})
export class CodeConfirmationDialog implements OnInit {
  form: FormGroup;
  confirmationCode: FormControl;

  constructor(public dialogRef: MatDialogRef<CodeConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              fb: FormBuilder) {
    this.confirmationCode = fb.control('', Validators.required);
    this.form = fb.group({
      confirmationCode: this.confirmationCode
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.confirmationCode.value);
  }
}
