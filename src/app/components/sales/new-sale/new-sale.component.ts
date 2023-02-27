import {Component} from '@angular/core';
import {ProductsService} from 'src/app/shared/services/products.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UserData} from "../../../shared/models/user-data.interface";
import {UserService} from "../../../shared/services/user.service";
import {ProductData} from "../../../shared/models/product.interface";
import {ProductService} from "../../../shared/services/product.service";
import {ProductVenta} from "../../../shared/models/product-venta.interface";

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
export class NewSaleComponent {

  users: UserData[];
  allProducts: ProductData[];

  productVenta: ProductVenta;

  products: ProductVenta[] = [];

  total: number = 0.00;

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private productService: ProductService
  ) {

  }

  formNewSale = this.formBuilder.group({
    client: ['', [Validators.required]],
    product: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    price: ['', [Validators.required]],
    total: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getAllClients();
    this.getAllProducts();
  }

  getAllClients() {
    this.userService.getAll().forEach((users) => {
      this.users = users.filter(user => user.roles.name == 'COMPRADOR')
    });
  }

  getAllProducts() {
    this.productService.getAll().forEach((products) => {
      this.allProducts = products.filter(product => product.state)
    });
  }

  addProductSale() {
    this.calculateTotalCost()
    this.total = this.total + this.productVenta.total;
    this.products.push(this.productVenta)
    this.formNewSale.controls['total'].setValue('');
    this.formNewSale.controls['amount'].setValue('');
  }

  generateSale() {

  }

  change(event: any) {
    this.allProducts.forEach(product => {
      if (product.id == event.target.value) {
        this.loadData(product)
      }
    })
  }

  loadData(product: ProductData) {
    this.loadProductSale(product)
    this.formNewSale.controls['stock'].setValue('' + product.stock);
    this.formNewSale.controls['price'].setValue('' + product.price);
  }

  loadProductSale(product: ProductData) {
    this.productVenta = {
      code: product.code,
      name: product.name,
      price: product.price,
      category: product.category.name
    }
  }

  calculateTotalCost(): void {
    const amount: number = this.productService.convertStringToNumber(this.formNewSale.value['amount']!);
    const price: number = this.productService.convertStringToNumber(this.formNewSale.value['price']!);
    const stock: number = this.productService.convertStringToNumber(this.formNewSale.value['stock']!);
    if (amount > 0 && stock >= amount) {
      const total = amount * price;
      this.formNewSale.controls['total'].setValue('' + total);
      this.productVenta.amount = amount;
      this.productVenta.total = total;
    } else if (amount < 0) {
      alert('Monto inválido. Solo se aceptan montos positivos')
    } else alert('Stock insuficiente')
  }

}
