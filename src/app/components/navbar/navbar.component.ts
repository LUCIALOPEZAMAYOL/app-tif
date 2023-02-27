import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  statesLogin = false;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private readonly router: Router
  ) {
    this.changeStateLogin();
  }

  changeStateLogin() {
    this.statesLogin = this.globalService.statesLogin;
  }

  logout() {
    this.authService.logout();
    this.globalService.statesLogin=false;
    this.changeStateLogin();
  }

  /* user = this.authService.authStates.pipe(
    filter(state => state? true : false)
  ) */
}
