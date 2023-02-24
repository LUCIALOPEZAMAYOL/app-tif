import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ){

  }

  login(){
    console.log(this.formLogin.value.email);
    this.formLogin.reset()
  }

  clean(){
    this.formLogin.reset()
  }
}
