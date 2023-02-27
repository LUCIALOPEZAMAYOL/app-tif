import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {Error404Component} from './components/error404/error404.component';
import {HomeComponent} from './components/home/home.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideDatabase, getDatabase} from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {ProductoComponent} from './components/producto/producto.component';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListSaleComponent } from './components/sales/list-sale/list-sale.component';
import { NewSaleComponent } from './components/sales/new-sale/new-sale.component';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    Error404Component,
    HomeComponent,
    CarouselComponent,
    ProductoComponent,
    ProductsComponent,
    NavComponent,
    AddProductComponent,
    DetailsProductComponent,
    DashboardAdminComponent,
    EditProductComponent,
    CreateUserComponent,
    ListUsersComponent,
    EditUserComponent,
    ListSaleComponent,
    NewSaleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        FormsModule,
        provideStorage(() => getStorage())
    ],
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
