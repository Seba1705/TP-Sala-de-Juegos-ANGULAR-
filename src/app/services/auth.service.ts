import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user:User;

    constructor(public afAuth: AngularFireAuth) { 
        
    }
    
    async login(email: string, password: string) {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            return result;
        }
        catch(err){
            console.log(err);
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

    async register(email: string, password: string) {
        try {
            const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return result;
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
            Swal.fire({
                text: err.error.error.message,
                icon: 'error',
                title: 'Error al autenticar'
            });
        }
    }
   
}


