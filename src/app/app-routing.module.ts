import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ListSaleComponent } from './components/sales/list-sale/list-sale.component';
import { NewSaleComponent } from './components/sales/new-sale/new-sale.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard-admin']);

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'equipos', component: ProductsComponent},
  { path: 'productos', component: DetailsProductComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'productos/nuevo', component: AddProductComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'productos/editar', component: EditProductComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'usuarios', component: ListUsersComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'usuarios/nuevo', component: CreateUserComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'usuarios/editar', component: EditUserComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'ventas', component: ListSaleComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'ventas/nueva-venta', component: NewSaleComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToHome }, },
  { path: 'register', component: RegisterComponent },
  { path: 'error404', component: Error404Component },
  { path: '**', pathMatch: 'full', redirectTo:'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
