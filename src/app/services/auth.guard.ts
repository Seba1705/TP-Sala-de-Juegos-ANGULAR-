import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authSrv: AuthService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
        return this.authSrv.user$.pipe(
            take(1),
            map((user) => user && this.authSrv.isAdmin(user)),
            tap(canAdmin => {
                if (!canAdmin) {
                    Swal.fire({
                        text: 'Debe autenticarse para acceder a la ruta especificada',
                        icon: 'error',
                        title: 'Acceso denegado',
                        cancelButtonColor: "#311B92",
                        confirmButtonColor: "#311B92"
                        
                    });
                    this.router.navigateByUrl('/Login');
                }
            })
        )
    }

}
