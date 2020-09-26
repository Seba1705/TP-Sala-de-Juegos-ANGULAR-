import { RoleValidator } from './../clases/role-validator';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { switchMap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import  Swal  from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NewAuthService extends RoleValidator {

    public user$: Observable<User>;

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { 
        super();

        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if(user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                }

                return of(null);
            })
        )
    }

    async login(email: string, password: string): Promise<User> {
        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();
        try {
            const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
            this.updateUserData(user);
            Swal.close();
            return user;
        }
        catch(err){
            Swal.fire({
                text: err.message,
                allowOutsideClick: false,
                icon: 'error'
            });
        }
    }

    async register(email: string, password: string): Promise<User> {
        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();
        try {
            const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return user;
        }
        catch(err){
            Swal.fire({
                text: err.message,
                allowOutsideClick: false,
                icon: 'error'
            });
        }
    }

    async logout() {
        try {
            await this.afAuth.signOut();
        }
        catch(err){
            console.log(err);
        }
    }

    updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            role: 'INVITADO'
        }

        return userRef.set(data, { merge: true });
    }
}
