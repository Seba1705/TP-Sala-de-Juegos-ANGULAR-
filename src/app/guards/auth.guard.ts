import { NewAuthService } from './../services/new-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private authSrv: NewAuthService, private router: Router){

    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authSrv.user$.pipe(
            take(1),
            map(user => user && this.authSrv.isInvitado(user)),
            tap(isInvited => {
                if(!isInvited) {
                    Swal.fire({
                        text: 'Debe autenticarse para acceder a la ruta especificada',
                        icon: 'error',
                        title: 'Acceso denegado',
                        confirmButtonColor: '#311B92'
                    });
                    this.router.navigateByUrl('Login');
                }
            })
        )
    }
}
