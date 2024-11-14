import { iUser } from './../auth/interfaces/i-user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { iTodo } from '../interfaces/i-todo';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthsrvService } from '../auth/authsrv.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosSubject$ = new BehaviorSubject<iTodo[] | null>(null)

  todosUrl:string = environment.todosUrl

  user!: iUser

  constructor(private http: HttpClient, private router: Router, private authSvc: AuthsrvService) {
    this.authSvc.user$.pipe(
      tap(user => {
        if (user) {
          this.user = user;
          this.getTodosByIdUser(this.user.id).subscribe();
        }
      })
    ).subscribe();

    this.getTodosByIdUser(this.user.id).subscribe()
  }

  postTodo(todo:Partial<iTodo>){
    return this.http.post<iTodo>(this.todosUrl,todo).pipe(
      tap(newTodo => {
        const currentTodos = this.todosSubject$.getValue();
        if(currentTodos){
          this.todosSubject$.next([...currentTodos, newTodo])
        }
      })
    )
  }

  getTodosByIdUser(userId: number) {
    return this.http.get<iTodo[]>(`${this.todosUrl}?userId=${userId}`).pipe(
      tap(todos => this.todosSubject$.next(todos))
    );
  }



}
