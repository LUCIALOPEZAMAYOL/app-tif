import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../shared/services/products.service'
import {ProductService} from "../../shared/services/product.service";
import {ProductData} from "../../shared/models/product.interface";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  allProducts: ProductData[];

  constructor(
    private productService: ProductService
  ){
  }

  ngOnInit():void {
    this.getAllProducts();
    /*
    this.productService.getAllProduct()
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });*/
  }

  getAllProducts() {
    this.productService.getAll().forEach((products) => {
      this.allProducts = products.filter(product => product.state)
    });
  }
}
