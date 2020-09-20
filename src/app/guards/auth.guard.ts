import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private auth: AuthService, private router: Router){

    }

    canActivate(): boolean {
        if(this.auth.estaAutenticado())
            return true;
        else {
            Swal.fire({
                text: 'Debe autenticarse para acceder a la ruta especificada',
                icon: 'error',
                title: 'Acceso denegado',
                confirmButtonColor: '#311B92'
            });
            this.router.navigateByUrl('/Login');
            return false;
        }
    }
}
