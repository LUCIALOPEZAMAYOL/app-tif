import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductService} from "../../shared/services/product.service";
import {ProductData} from "../../shared/models/product.interface";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {finalize, map, Observable} from "rxjs";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  categories = ['EQUIPOS', 'PLANES', 'HOGAR'];
  fireStorageReference: AngularFireStorageReference;
  fireUploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;


  imageUrl = ''

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private afStorage: AngularFireStorage
  ) {

  }

  formAddProduct = this.formBuilder.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: [''],
    image: [''],
    category: ['', [Validators.required]]
  })

  save() {
    if (this.formAddProduct.valid) {
      const data: ProductData = {
        code: this.formAddProduct.value['code']!,
        name: this.formAddProduct.value['name']!,
        stock: this.productService.convertStringToNumber(this.formAddProduct.value['stock']!),
        price: this.productService.convertStringToNumber(this.formAddProduct.value['price']!),
        description: this.formAddProduct.value['description']!,
        image: this.imageUrl,
        state: true,
        category: {
          name: this.formAddProduct.value['category']!
        }
      }
      this.productService.create(data).then((result) => {
        data.id = result.id
        this.productService.update(data);
        console.log('Registro Exitoso');
        this.router.navigate(['/productos']);
      })
        .catch((e) => console.log(e.message));
    }
  }

  cancel() {
    this.router.navigate(['/productos']);
  }

  upload(event) {
    let randomId: string;
    randomId = Math.random().toString(36).substring(2);
    this.fireStorageReference = this.afStorage.ref(`/images/${randomId}`);
    this.fireUploadTask = this.fireStorageReference.put(event["target"].files[0]);
    this.uploadProgress = this.fireUploadTask.percentageChanges();
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
}
