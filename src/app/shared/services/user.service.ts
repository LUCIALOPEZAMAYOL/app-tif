import {Injectable} from '@angular/core';
import {UserData} from "../models/user-data.interface";
import {
  collection,
  Firestore,
  CollectionReference,
  doc,
  updateDoc, deleteDoc, collectionData, getDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userCollection: CollectionReference;

  constructor(private readonly firestore: Firestore, private afs: AngularFirestore) {
    this.userCollection = collection(this.firestore, 'users');
  }

  create(user: UserData) {
    const userDocumentReference: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.id}`
    );
    return userDocumentReference.set(user, {merge: true})
  }

  update(user: UserData) {
    const userDocumentReference = doc(
      this.firestore,
      `users/${user.id}`
    );
    return updateDoc(userDocumentReference, {...user});
  }

  delete(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocumentReference);
  }


  get(id: String) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return getDoc(userDocumentReference);
  }

  getAll() {
    return collectionData(this.userCollection, {
      idField: 'id',
    }) as Observable<UserData[]>;
  }

}
