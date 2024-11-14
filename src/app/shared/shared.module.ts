import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    SingleTodoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatChipsModule,
    MatIcon,
    MatButtonModule,
    MatMenuModule
  ],
  exports:[
    SingleTodoComponent,
    RouterModule
  ]
})
export class SharedModule { }
