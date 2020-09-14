import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user:User;

    constructor(public auth: AngularFireAuth) { 
        
    }
    
    async login(email: string, password: string) {
        try {
            const result = await this.auth.signInWithEmailAndPassword(email, password);
            return result;
        }
        catch(err){
            console.log(err);
        }

    }

    async logout() {
        try {
            await this.auth.signOut(); 
        }
        catch(err) {
            console.log(err);
        }
    }

    async register(email: string, password: string) {
        try {
            const result = await this.auth.createUserWithEmailAndPassword(email, password);
            return result;
        }
        catch(err) {
            console.log(err);
        }
    }

    getCurrentUser() {
        try {
            return this.auth.authState.pipe(first()).toPromise();
        }
        catch(err) {
            console.log(err);
        }
    }
   
}


