import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from "@firebase/auth";
import {LoginData} from "../../../shared/models/login-data.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {UserData} from "../../../shared/models/user-data.interface";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  documentsType = ['DNI', 'CE', 'PASAPORTE'];
  roles = ['ADMINISTRADOR', 'VENDEDOR', 'COMPRADOR']
  documentSelected: string = '0';
  viewDocument: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {

  }

  formAddUser = this.formBuilder.group({
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])(?!\s)[a-zA-Z\d#$@!%&*?]{8,16}$/gm)]],
    validatePassword: ['', [Validators.required]],
    rol: ['', [Validators.required]]
  })

  addUser() {
    if (this.formAddUser.valid) {
      const body: LoginData = {
        email: this.formAddUser.value['email']!,
        password: this.formAddUser.value['password']!
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
      documentType: this.formAddUser.value['documentType']!,
      documentNumber: this.formAddUser.value['documentNumber']!,
      name: this.formAddUser.value['name']!,
      lastName: this.formAddUser.value['lastName']!,
      email: user.email!,
      roles: {
        name: this.formAddUser.value['rol']!
      }
    }
    this.userService.create(data).then(() => {
      console.log('Registro exitoso');
      this.router.navigate(["/usuarios"]);
      this.formAddUser.reset();
    })
  }


  cancel() {
    this.router.navigate(['/usuarios'])
  }

}
