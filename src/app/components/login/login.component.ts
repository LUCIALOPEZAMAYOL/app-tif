import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginData } from 'src/app/shared/models/login-data.interface';
import {UserData} from "../../shared/models/user-data.interface";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginErrorState = false;
  user: UserData;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private globalService: GlobalService,
    private userService: UserService
  ) {

  }

  formLogin = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })


  login() {
    if (this.formLogin.valid) {
      const body: LoginData = {
        email: this.formLogin.value['email']!,
        password: this.formLogin.value['password']!
      };
      this.authService
        .login(body)
        .then((userCredential) => {
          this.globalService.statesLogin = true;
          this.userService.get(userCredential.user.uid).then(result => {
            this.user = <UserData>result.data();
            this.globalService.rolUser = this.user.roles.name;
            this.navigate(this.user.roles.name);
          })
        })
        .catch((e) => {
          console.log(e.message);
          this.loginErrorState = true;
        });
    }
  }

  navigate(rol: string) {
    if (rol == 'COMPRADOR') this.router.navigate(['/home'])
    if (rol == 'ADMINISTRADOR' || rol == 'VENDEDOR') this.router.navigate(['/dashboard-admin'])
  }

  get emailNoValido () {
    return this.formLogin.get('email')?.invalid && this.formLogin.get('email')?.touched
  }
  get passwordNoValido () {
    return this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched
  }

  clean() {
    this.formLogin.reset()
  }
}
