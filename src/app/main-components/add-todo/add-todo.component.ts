import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {
  dialogRef = inject(DialogRef);
  form!: FormGroup
  minDate: Date;

  constructor(){
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      task: new FormControl('', [Validators.required]),
      date: new FormControl(null),
      list: new FormControl('')
    });
  }

  saveTask() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  isInValidTouched(fieldName: string) {
    return !this.isValid(fieldName) && this.isTouched(fieldName);
  }
}
