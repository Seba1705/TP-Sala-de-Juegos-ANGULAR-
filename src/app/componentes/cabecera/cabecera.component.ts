import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css'],
    providers: [
        AuthService
    ]
})
export class CabeceraComponent {

    public user$: Observable<any> = this.authSrv.afAuth.user;

    constructor(private authSrv: AuthService, private router: Router) { }

    async onLogout() {
        try {
            await this.authSrv.logout();
            this.router.navigateByUrl('/Login');
        }
        catch(err) {
            console.log(err);
        }
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
        }
    }
}
