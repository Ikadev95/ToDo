import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient( withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
