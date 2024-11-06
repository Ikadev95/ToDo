import { iUser } from './i-user';
import { Injectable } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, tap } from 'rxjs';
import { iAccessdata } from './i-accessdata';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iLoginRequest } from './i-login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthsrvService {

  private jwtHelper:JwtHelperService = new JwtHelperService()

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl
  autoLogoutTimer:any

  authSubject$ = new BehaviorSubject<iAccessdata | null>(null)
  //subject in cui ho i dati utente che mi arrivano dal server

  //per avere solo user senza access data
  //qui escono i dati solo dopo la trasformazione tramite pipe
  user$ = this.authSubject$.asObservable().pipe(map(accessData => accessData?.user))

  // !! serve per convertire in boolean
  isLoggedIn$ = this.authSubject$.pipe(map(accessData => !!accessData))

  constructor(private http:HttpClient, private router:Router) {
    this.restoreUser()
  }

  register(newUser:Partial<iUser>){
    return this.http.post<iAccessdata>(this.registerUrl,newUser)
    //inserisco con una post nel db il nuovo utente
  }

  login(authData:iLoginRequest){
    // qui ho creato la nuova interfaccia iLoginRequest perchè l'utente inserisce solo di psw e mail e non un utente completo
    return this.http.post<iAccessdata>(this.loginUrl, authData)

    .pipe(tap(accessData => {
      //prendo i dati che mi arrivano e li immetto nel subject con next()
      this.authSubject$.next(accessData)
      // li salvo anche nel localStorage
      localStorage.setItem('accessData',JSON.stringify(accessData))
      //recupero la data di scadenza del token
      const expDate = this.jwtHelper.getTokenExpirationDate(accessData.accessToken)
      if (expDate) this.autoLogout(expDate)
    })
    )
  }

  logout(){
    this.authSubject$.next(null)
    localStorage.removeItem('accesssData')
    this.router.navigate(['login'])
  }
  autoLogout(expDate:Date){
   // clearTimeout(this.autoLogoutTimer)

    // calcolo quanto tempo manca tra la data di exp e il momento attuale
    const expMs = expDate.getTime() - new Date().getTime()

    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expMs)
  }

  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData')
    if(!userJson)return

    const accessdata:iAccessdata = JSON.parse(userJson)

    if(this.jwtHelper.isTokenExpired(accessdata.accessToken)) {
      localStorage.removeItem('accessData')
      return
    }

    this.authSubject$.next(accessdata)
  }
}
