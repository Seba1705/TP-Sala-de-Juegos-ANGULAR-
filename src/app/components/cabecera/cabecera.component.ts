import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.interface';

@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

    public isLogged: boolean = false;
    public user$: Observable<User> = this.authSrv.afAuth.user;

    constructor(public authSrv: AuthService, private router: Router) { 
        
    }

    async salir() {
        await this.authSrv.logout();
        this.router.navigateByUrl('Login');
    }

    Juego(tipo: string) {
        switch (tipo) {
            case 'Adivina':
                this.router.navigate(['/Juegos/Adivina']);
                break;
            case 'Agilidad':
                this.router.navigate(['/Juegos/Agilidad']);
                break;
            case 'AdivinaMasListado':
                this.router.navigate(['/Juegos/AdivinaMasListado']);
                break;
            case 'AgilidadaMasListado':
                this.router.navigate(['/Juegos/AgilidadaMasListado']);
                break;
            case 'Ppt':
                this.router.navigate(['/Juegos/Ppt']);
                break;
            case 'Anagrama':
                this.router.navigate(['/Juegos/Anagrama']);
                break;
            case 'Ahorcado':
                this.router.navigate(['/Juegos/Ahorcado']);
                break;
            case 'Tateti':
                this.router.navigate(['/Juegos/Tateti']);
                break;
            case 'Memotest':
                this.router.navigate(['/Juegos/Memotest']);
                break;
        }
    }

}
