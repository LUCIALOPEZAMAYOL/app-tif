import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/shared/services/auth.service';
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  rolGlobal = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.rolGlobal = globalService.rolUser;
  }

  /* user = this.authService.authStates.pipe(
    filter(state => state? true : false)
  ) */

  logout() {
    this.authService.logout();
    this.router.navigate(['/home'])
  }
}
