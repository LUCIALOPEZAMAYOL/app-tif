import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {LoginData} from "../../shared/models/login-data.interface";
import {UserData} from "../../shared/models/user-data.interface";
import {User} from "@firebase/auth";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  documentsType = ['DNI', 'CE', 'PASAPORTE'];

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {

  }

  formRegister = this.formBuilder.group({
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])(?!\s)[a-zA-Z\d#$@!%&*?]{8,16}$/gm)]],
    validatePassword: ['', [Validators.required]]
  })

  register() {
    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
      const body: LoginData = {
        email: this.formRegister.value['email']!,
        password: this.formRegister.value['password']!
      };
      this.authService
        .register(body)
        .then((user) => {
          this.saveUser(user.user)
        })
        .catch((e) => console.log(e.message));
    }
  }

  private saveUser(user: User) {
    const data: UserData = {
      id: user.uid,
      documentType: this.formRegister.value['documentType']!,
      documentNumber: this.formRegister.value['documentNumber']!,
      name: this.formRegister.value['name']!,
      lastName: this.formRegister.value['lastname']!,
      email: user.email!,
      roles: {
        name: 'COMPRADOR'
      }
    }
    this.userService.create(data).then((data) => console.log('Registro exitoso'))
    this.router.navigate(['/login']).then(() => console.log('Ok'))
  }

  get docNumNoValido () {
    return this.formRegister.get('documentNumber')?.invalid && this.formRegister.get('documentNumber')?.touched
  }
  get nameNoValido () {
    return this.formRegister.get('name')?.invalid && this.formRegister.get('name')?.touched
  }
  get lastnameNoValido () {
    return this.formRegister.get('lastname')?.invalid && this.formRegister.get('lastname')?.touched
  }
  get emailNoValido () {
    return this.formRegister.get('email')?.invalid && this.formRegister.get('email')?.touched
  }
  get passwordNoValido () {
    return this.formRegister.get('password')?.invalid && this.formRegister.get('password')?.touched
  }


}
