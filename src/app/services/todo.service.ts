import { iUser } from './../auth/interfaces/i-user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iTodo } from '../interfaces/i-todo';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosSubject$ = new BehaviorSubject<iTodo[] | null>(null)



  todosUrl:string = environment.todosUrl

  constructor(private http:HttpClient, private router:Router) {
    this.getAllTodos().subscribe()
  }

  private getAllTodos() {
    return this.http.get<iTodo[]>(this.todosUrl).pipe(
      tap(todos => this.todosSubject$.next(todos))
    );
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


}
