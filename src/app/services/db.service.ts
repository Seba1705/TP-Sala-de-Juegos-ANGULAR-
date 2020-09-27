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

    // AddResult(game: any, points: any, win: any) {
    //     const date = new Date();
    //     const result = {
    //         createdAt: date.toLocaleDateString(),
    //         game: game,
    //         idUser: this.autenticacionService.user.email,
    //         points: points,
    //         win: win
    //     }
    //     const id = this.afs.createId();
    //     return this.afs.collection('/results').doc(id).set(result);
    // }

    // AddUser(email: any) {
    //     const date = new Date();
    //     const user = {
    //         createdAt: date.toLocaleDateString(),
    //         id: Math.floor(Math.random() * Math.floor(6)),
    //         name: email.split('@')[0],
    //         mail: email
    //     }
    //     const id = this.afs.createId();
    //     return this.afs.collection('/users').doc(id).set(user);
    // }

}