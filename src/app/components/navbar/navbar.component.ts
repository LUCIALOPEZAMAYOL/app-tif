import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  statesLogin = false
  constructor(private globalService: GlobalService){
    this.changeStateLogin()
  }

  changeStateLogin(){
    this.statesLogin = this.globalService.statesLogin
  }

}
