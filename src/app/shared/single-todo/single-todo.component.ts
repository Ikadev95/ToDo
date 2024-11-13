import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iTodo } from '../../interfaces/i-todo';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.scss'
})
export class SingleTodoComponent implements OnInit{
  @Input() todo!:iTodo
  day!: string

  ngOnInit(): void {
  }


}
