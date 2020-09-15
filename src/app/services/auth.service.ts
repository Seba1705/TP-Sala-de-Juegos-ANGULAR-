import { RoleValidator } from './../auht/helper/role-validator.class';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, first, switchMap } from 'rxjs/operators';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService extends RoleValidator {

    public user$: Observable<User>;

    constructor(public afAuth: AngularFireAuth, 
                private afs: AngularFirestore) { 

        super(); 
        
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if(user)
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                
                return of(null);
            })
        )
    }
    
    async login(email: string, password: string): Promise<User> {
        try {
            const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
            this.updateUserData(user);
            return user;
        }
        catch(err){
            console.log(err.message);
        }

    }

    async logout() {
        try {
            await this.afAuth.signOut(); 
        }
        catch(err) {
            console.log(err);
        }
    }

    async register(email: string, password: string): Promise<any>{
        try {
            const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return user;
        }
        catch(err) {
            console.log(err);
        }
    }

    getCurrentUser() {
        try {
            return this.afAuth.authState.pipe(first()).toPromise();
        }
        catch(err) {
            console.log(err);
        }
    }
   
    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            role: 'Admin'
        }

        return userRef.set(data, { merge: true });
    }
}


