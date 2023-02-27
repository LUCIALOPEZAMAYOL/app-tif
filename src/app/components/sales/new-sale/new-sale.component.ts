import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
export class NewSaleComponent {

  users:string[] = ["Pepito", "Juanita", "Anita"];

  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
  ){
  }

  formNewSale = this.formBuilder.group({
    cliente: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    total: ['', [Validators.required]],
    validatePassword: ['', [Validators.required]],
    rol: ['', [Validators.required]]
  })

  ngOnInit():void {
    this.productService.getAllProduct()
    .subscribe(data => {
      this.products = data;
    });
  }

  addProductSale(){

  }

  generateSale(){

  }

}
