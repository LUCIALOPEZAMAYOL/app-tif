import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";
import {ProductData} from "../../shared/models/product.interface";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  categories = ['EQUIPOS', 'PLANES', 'HOGAR']
  product: { [p: string]: any };
  fireStorageReference: AngularFireStorageReference;
  fireUploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  imageUrl = '';
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private afStorage: AngularFireStorage
  ){
    const navigation = this.router.getCurrentNavigation()
    this.product = navigation?.extras?.state!;
    this.loadDataForm()
  }

  formEditProduct = this.formBuilder.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: [''],
    image: [''],
    category: ['', [Validators.required]]
  })

  updateProduct(){
    if (this.formEditProduct.valid) {
      const data: ProductData = {
        id: this.product['value'].id,
        code: this.formEditProduct.value['code']!,
        name: this.formEditProduct.value['name']!,
        stock: this.productService.convertStringToNumber(this.formEditProduct.value['stock']!),
        price: this.productService.convertStringToNumber(this.formEditProduct.value['price']!),
        description: this.formEditProduct.value['description']!,
        image: this.imageUrl,
        category: {
          name: this.formEditProduct.value['category']!
        }
      }
      this.productService.update(data).then(() => {
        console.log('Actualización exitosa');
        this.router.navigate(["/productos"]);
        this.formEditProduct.reset();
      })
    }
  }

  loadDataForm() {
    this.formEditProduct.controls['code'].setValue(this.product['value'].code);
    this.formEditProduct.controls['name'].setValue(this.product['value'].name);
    this.formEditProduct.controls['stock'].setValue(this.product['value'].stock);
    this.formEditProduct.controls['price'].setValue(this.product['value'].price);
    this.formEditProduct.controls['description'].setValue(this.product['value'].description);
    this.formEditProduct.controls['category'].setValue(this.product['value'].category.name);
  }

  upload(event) {
    let randomId: string = Math.random().toString(36).substring(2);
    this.fireStorageReference = this["afStorage"].ref(`/images/${randomId}`);
    this.fireUploadTask = this["fireStorageReference"].put(event["target"].files[0]);
    this.uploadProgress = this["fireUploadTask"].percentageChanges();
    this.fireUploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.fireStorageReference.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.imageUrl = url
        })
      })
    )
      .subscribe();
  }

  cancel(){
    this.router.navigate(['/productos']);
  }
}
