import { iUser } from './../auth/interfaces/i-user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iTodo } from '../interfaces/i-todo';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosSubject$ = new BehaviorSubject<iTodo[] | null>(null)

  todosUrl:string = environment.todosUrl

  constructor(private http:HttpClient, private router:Router) { }

  getTodosOfUser(userId: number){
    let todos =  this.http.get(this.todosUrl)
    console.log(todos)
  }
  postTodo(todo:Partial<iTodo>){
    return this.http.post<iTodo>(this.todosUrl,todo)
  }
}
