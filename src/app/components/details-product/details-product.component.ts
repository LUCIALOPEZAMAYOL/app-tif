import {Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ProductService} from "../../shared/services/product.service";
import {ProductData} from "../../shared/models/product.interface";

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent {

  products: ProductData[];
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router,
              private readonly productService: ProductService) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll().forEach((products) => {
      this.products = products.filter(product => product.state)
    });
  }

  addProduct() {
    console.log('Nuevo....')
    this.router.navigate(['/productos/nuevo']);
  }

  editProduct(product: ProductData) {
    if (this.navigationExtras.state) {
      console.log('Editando....')
      this.navigationExtras.state['value'] = product;
      this.router.navigate(['/productos/editar'], this.navigationExtras);
    }
  }

  deleteProduct(product: ProductData) {
    if (confirm('Eliminar Producto?')) {
      product.state = false;
      this.productService.update(product).then(() => {
        console.log('Eliminación exitosa');
        this.getAllProducts();
      })
    }
  }

}
