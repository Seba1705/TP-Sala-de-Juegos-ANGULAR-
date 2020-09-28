import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class DbServiceService {

    constructor(private afs: AngularFirestore, public autenticacionService: AuthService) { }

    GetUsers() {
        return new Promise<any>((resolve, reject) => {
            this.afs.collection('/users').valueChanges().subscribe(snapshots => {
                resolve(snapshots)
            })
        })
    }

    GetResults(juego) {
        return new Promise<any>((resolve, reject) => {
            this.afs.collection(`${juego}`).valueChanges().subscribe(snapshots => {
                resolve(snapshots)
            })
        })
    }

    GetResultsUser(juego, usuario) {
        return new Promise<any>((resolve, reject) => {
            this.afs.collection(`${juego}/${usuario.uid}`).valueChanges().subscribe(snapshots => {
                resolve(snapshots)
            })
        })
    }

}