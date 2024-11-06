import { Component } from '@angular/core';
import { AuthsrvService } from '../authsrv.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from '../i-login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private authSvc: AuthsrvService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(){
    if(this.form.valid){
      //prendo i dati dal form e li inserisco in una varabile
      const formData: iLoginRequest = this.form.value;
      this.authSvc.login(formData).subscribe(
        {
          next: (data) => {
            console.log('login effettuato con successo')
          },
          error:(data) => {
            console.log('errore login')
          }
        }
      )

    }
    else{
      console.log('form invalido')
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
