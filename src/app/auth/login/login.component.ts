// import { afterNextRender, afterRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form');

//       if (savedForm) {
//         const loadedFormData = JSON.parse(savedForm);
//         const savedEmail = loadedFormData.email;

//         setTimeout(() => {
//           this.form().controls['email'].setValue(savedEmail);
//         }, 1);
//       }

//       const subscription = this.form().valueChanges?.pipe(
//         debounceTime(500)
//       ).subscribe({
//         next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
//       });

//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }

//   onSubmit(formData: NgForm) {
//     if (formData.form.invalid) {
//       return;
//     }

//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;

//     console.log(formData.form);
//     console.log(enteredEmail, enteredPassword);

//     formData.form.reset();
//     formData
//   }
// }

import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null // if valid
  }
  return { doesNotContainQuestionMark: true } // if invalid
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'admin@example.com') {
    return of(null);
  }

  return of({ notUnique: true });

}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    }),
  });

  get IsEmailInvalid() {
    return (this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid);
  }
  get IsPasswordInvalid() {
    return (this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid);
  }

  onSubmit() {
    // this.form.controls.email.addValidators([Validators.required, Validators.max(4)]);
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}