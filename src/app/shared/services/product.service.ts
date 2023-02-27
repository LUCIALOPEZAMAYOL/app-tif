import { Injectable } from '@angular/core';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {finalize, Observable} from "rxjs";
import {ProductData} from "../models/product.interface";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productCollection: CollectionReference;
  fireStorageReference: AngularFireStorageReference;
  fireUploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;

  constructor(private readonly firestore: Firestore, private afStorage: AngularFireStorage) {
    this.productCollection = collection(this.firestore, 'products');
  }

  create(data: ProductData) {
    return addDoc(this.productCollection, data);
  }

  update(data: ProductData) {
    const productDocumentReference = doc(
      this.firestore,
      `products/${data.id}`
    );
    return updateDoc(productDocumentReference, { ...data });
  }

  delete(id: string) {
    const productDocumentReference = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }

  get(id: string) {
    const productDocumentReference = doc(this.firestore, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  getAll() {
    return collectionData(this.productCollection, {
      idField: 'id',
    }) as Observable<ProductData[]>;
  }

  convertStringToNumber(data: string) {
    if (!isNaN(Number(data)))
      return Number(data);
    return 0
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.fireStorageReference = this.afStorage.ref('/images/' + randomId);
    this.fireUploadTask = this.fireStorageReference.put(event.target.files[0]);
    this.uploadProgress = this.fireUploadTask.percentageChanges();
    this.fireUploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.fireStorageReference.getDownloadURL();
      })
    )
      .subscribe();
    return this.downloadURL
  }

}
