import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    isLogged: boolean;

    constructor(public authSrv: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.isLogged = this.authSrv.estaAutenticado();
        this.authSrv.mensajeObservable.subscribe(resp => this.isLogged = resp);
    }

    salir() {
        this.authSrv.logout();
        this.authSrv.enviarMensaje(false);
        this.router.navigateByUrl('/Login');
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
