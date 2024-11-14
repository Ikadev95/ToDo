import { iTodo } from './../../interfaces/i-todo';
import { Component, inject, OnInit } from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { iUser } from '../../auth/interfaces/i-user';
import { tap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { AddTodoComponent } from '../../main-components/add-todo/add-todo.component';
import { TodoService } from '../../services/todo.service';

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
  result! : Partial<iTodo>
  todos!: iTodo[]

  constructor(private authSrv : AuthsrvService, private todoSvc : TodoService){
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
    this.day = this.days[this.today.getDay()]
    this.month = this.months[this.today.getMonth()]

    this.todoSvc.todosSubject$.subscribe(todos => {
      if(todos)
      this.todos = todos;
      console.log("Todos dell'utente:", this.todos);
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      minWidth: '400px',
    });

    //da closed riesco a recuperare i dati del form nella modale
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.result = result
        this.result.completed = false;
        this.result.userId = this.user.id
        this.todoSvc.postTodo(this.result).subscribe()
        console.log(this.result)
      }
    });
  }
}
