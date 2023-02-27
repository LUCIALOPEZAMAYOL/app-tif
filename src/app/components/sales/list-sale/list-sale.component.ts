import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent {

  constructor(
    private router:Router
  ){

  }

  newSale(){
    this.router.navigate(['ventas/nueva-venta']);
  }

  details(){

  }

}
