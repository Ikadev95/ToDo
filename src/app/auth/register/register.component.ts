import { AuthsrvService } from './../authsrv.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form:FormGroup;
  registerok = false

  constructor(private authSvc : AuthsrvService, private router: Router ){
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }


  register(){
    if(this.form.valid){
      this.authSvc.register(this.form.value).subscribe(res => {
        console.log('Registrazione andata a buon Fine!');
        this.registerok = true;
        setTimeout(()=>{this.router.navigate([''])},1200)
      })
    }
    else{
      console.log('not valid')
    }
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid
   }
   isTouched(fieldName: string) {
     return this.form.get(fieldName)?.touched
   }

  isInValidTouched(fieldName:string){
    return !this.isValid(fieldName) && this.isTouched(fieldName)
  }

}
