import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedRoutingModule } from './completed-routing.module';
import { CompletedComponent } from './completed.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CompletedComponent
  ],
  imports: [
    CommonModule,
    CompletedRoutingModule,
    SharedModule
  ]
})
export class CompletedModule { }
