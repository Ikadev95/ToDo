import { Component, inject, OnInit } from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { iUser } from '../../auth/interfaces/i-user';
import { tap } from 'rxjs';
import {Dialog} from '@angular/cdk/dialog';
import { AddTodoComponent } from '../../main-components/add-todo/add-todo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  dialog = inject(Dialog);

  user!: iUser
  today!: Date
  day!: string
  month!:string
  days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']

  constructor(private authSrv : AuthsrvService){
    this.authSrv.user$.pipe(
      tap( user => {
        if(user)
          this.user = user
      }
      )
    ).subscribe()
  }
  ngOnInit(): void {
    this.today = new Date()
    console.log(this.today)
    this.day = this.days[this.today.getDay()]
    this.month = this.months[this.today.getMonth()]

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      minWidth: '400px',
    })
  }
}
