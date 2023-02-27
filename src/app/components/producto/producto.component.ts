import { Component, Input } from '@angular/core';
import {ProductData} from "../../shared/models/product.interface";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  @Input('myProduct') product!:ProductData;
}
