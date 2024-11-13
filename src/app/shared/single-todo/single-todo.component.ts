import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iTodo } from '../../interfaces/i-todo';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.scss'
})
export class SingleTodoComponent implements OnInit{
  @Input() todo!:iTodo
  day!: string

  constructor(private dateSvc : DatesService){}
  ngOnInit(): void {
    let prova = this.dateSvc.convertDateForTodo(this.todo.date)
    if (prova){
      this.day = prova
    }

  }


}
