import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule} from '@angular/cdk/dialog';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class HomeModule { }
