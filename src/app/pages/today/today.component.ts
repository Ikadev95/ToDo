import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { iTodo } from '../../interfaces/i-todo';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  todos: iTodo[] = [];

  constructor(private todoSvc: TodoService, private datesSvc: DatesService) {}

  ngOnInit(): void {
    this.todoSvc.todosSubject$.subscribe(todos => {
      if (todos) {
        this.todos = todos.filter(todo =>
          this.datesSvc.convertDateForTodo(todo.date) === "Oggi"
        );
      }
    });
  }
}
