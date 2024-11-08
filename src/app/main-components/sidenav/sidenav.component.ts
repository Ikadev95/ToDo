import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, inject} from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { iUser } from '../../auth/interfaces/i-user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  user!:iUser

  constructor(private authSvc: AuthsrvService, private router:Router){
    this.authSvc.user$.pipe(
      tap( user => {
        if(user)
          this.user = user
      }
      )
    ).subscribe()
  }

  logged!: boolean

  ngOnInit(): void {
     this.authSvc.isLoggedIn$.pipe(
      tap( logged => {
          this.logged = logged
      }
      )
     ).subscribe()
  }

  logout(){
    this.authSvc.logout()
    this.router.navigate(['auth'])
  }
}
