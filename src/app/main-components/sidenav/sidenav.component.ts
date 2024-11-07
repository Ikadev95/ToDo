import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, inject} from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  constructor(private authSvc: AuthsrvService){}

  logged!: boolean

  ngOnInit(): void {
     this.authSvc.isLoggedIn$.pipe(
      tap( logged => {
          this.logged = logged
      }
      )
     ).subscribe()
  }

}
