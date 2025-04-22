import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
  });

  get isEmailValid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get isPasswordValid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    const enteredEmail = this.form.controls.email.value;
    const enteredPassword = this.form.controls.password.value;

    console.log(this.form);
    console.log(enteredEmail, enteredPassword);
    this.onReset();

  }

  onReset() {
    this.form.reset();
  }
}
