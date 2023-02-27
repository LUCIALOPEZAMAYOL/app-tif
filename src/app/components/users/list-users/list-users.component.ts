import {Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {UserService} from "../../../shared/services/user.service";
import {UserData} from "../../../shared/models/user-data.interface";
import {Observable} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: Observable<UserData[]>;
 navigationExtras: NavigationExtras = {
   state: {
     value: null
   }
 };
  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly authService: AuthService
              ) {
    this.users = userService.getAll()
  }

  addUser() {
    console.log('Nuevo....')
    this.router.navigate(['usuarios/nuevo']);
  }

  editUser(user: UserData) {
    console.log('Editando....')
    if (this.navigationExtras.state) {
      this.navigationExtras.state['value'] = user;
      this.router.navigate(['/usuarios/editar'], this.navigationExtras);
    }
  }

  deleteUser(user: UserData) {
    if (confirm('Eliminar?')) {
      this.userService.delete(user.id!).then(() => {
        console.log('Eliminación exitosa');
        this.users = this.userService.getAll()
      })
    }
  }

}
