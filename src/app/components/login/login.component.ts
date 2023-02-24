import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ){

  }

  login(){
    console.log(this.formLogin.value);
    console.log(this.formLogin.valid);

    //this.globalService.statesLogin=true
  }

  clean(){
    this.formLogin.reset()
  }
}
