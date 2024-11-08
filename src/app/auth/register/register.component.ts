import { AuthsrvService } from './../authsrv.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  registerok = false;
  registerfalse = false;
  passwordVisible = false;

  constructor(
    private authSvc: AuthsrvService,
    private router: Router,
    private cdr: ChangeDetectorRef  // Iniettiamo ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      nikname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  register() {
    if (this.form.valid) {
      this.authSvc.register(this.form.value).subscribe({
        next: (res) => {
          console.log('Registrazione andata a buon fine!');
          this.registerok = true;
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1200);
        },
        error: (err) => {
          console.log('Errore:', err);
          this.registerfalse = true;
          this.resetRegisterFalse();
        }
      });
    } else {
      console.log('Errore: Il form non è valido');
      this.registerfalse = true;
      this.resetRegisterFalse();
    }
  }

  resetRegisterFalse() {
    setTimeout(() => {
      this.registerfalse = false;
      this.cdr.detectChanges();  // Forza il rilevamento delle modifiche
    }, 5000);
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

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
