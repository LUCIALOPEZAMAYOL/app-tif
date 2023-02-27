import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {UserData} from "../../../shared/models/user-data.interface";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  documentsType = ['DNI', 'CE', 'PASAPORTE'];
  roles = ['ADMINISTRADOR', 'VENDEDOR', 'COMPRADOR']
  user: { [p: string]: any };

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation()
    this.user = navigation?.extras?.state!;
    this.loadDataForm()
  }

  formEditUser = this.formBuilder.group({
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    rol: ['', [Validators.required]]
  })

  loadDataForm() {
    this.formEditUser.controls['documentType'].setValue(this.user['value'].documentType);
    this.formEditUser.controls['documentNumber'].setValue(this.user['value'].documentNumber);
    this.formEditUser.controls['name'].setValue(this.user['value'].name);
    this.formEditUser.controls['lastName'].setValue(this.user['value'].lastName);
    this.formEditUser.controls['rol'].setValue(this.user['value'].roles.name);
  }

  updateUser() {
    if (this.formEditUser.valid) {
      const data: UserData = {
        id: this.user['value'].id,
        documentType: this.formEditUser.value['documentType']!,
        documentNumber: this.formEditUser.value['documentNumber']!,
        name: this.formEditUser.value['name']!,
        lastName: this.formEditUser.value['lastName']!,
        email: this.user['value'].email,
        roles: {
          name: this.formEditUser.value['rol']!
        }
      }
      this.userService.update(data).then(() => {
        console.log('Actualización exitosa');
        this.router.navigate(["/usuarios"]);
        this.formEditUser.reset();
      })
    }
  }

  cancel() {
    this.router.navigate(['/usuarios'])
  }

}
