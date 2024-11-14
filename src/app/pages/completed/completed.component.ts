import { Component, OnInit } from '@angular/core';
import { iTodo } from '../../interfaces/i-todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit {
  todos!: iTodo[]

  constructor(private todoSvc: TodoService){}
  ngOnInit(): void {

    this.todoSvc.todosSubject$.subscribe(todos => {
      if(todos){
       let filtered =  todos.filter( todo => todo.completed === true)
       this.todos = filtered
      }
    });

  }

}
