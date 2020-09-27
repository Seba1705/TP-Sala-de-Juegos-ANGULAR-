import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-agilidad-aritmetica',
    templateUrl: './agilidad-aritmetica.component.html',
    styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
    @Output()
    enviarJuego: EventEmitter<any> = new EventEmitter<any>();
    nuevoJuego: JuegoAgilidad;
    ocultarVerificar: boolean;
    Tiempo: number;
    repetidor: any;
    private subscription: Subscription;
    Mensajes: string;
    clase: string;
    usuarioLogueado: any;

    ngOnInit() {
    }

    constructor(private snackBar: MatSnackBar, public auth: AuthService) {
        this.ocultarVerificar = true;
        this.Tiempo = 10;
        this.nuevoJuego = new JuegoAgilidad();
        this.nuevoJuego.primerNumero = 0;
        this.nuevoJuego.segundoNumero = 0;
    }
    NuevoJuego() {
        this.ocultarVerificar = false;
        this.repetidor = setInterval(() => {

            this.Tiempo--;
            if (this.Tiempo == 0) {
                clearInterval(this.repetidor);
                this.verificar();
                this.ocultarVerificar = true;
                this.Tiempo = 10;
                this.enviarJuego.emit(this.nuevoJuego);
            }
        }, 900);
        this.nuevoJuego = new JuegoAgilidad();
        this.clase = "";

    }
    verificar() {
        if (this.nuevoJuego.verificar()) {
            this.ocultarVerificar = true;
            this.nuevoJuego.gano = true;
            this.enviarJuego.emit(this.nuevoJuego);
            clearInterval(this.repetidor);
            this.snackBar.open('Felicitaciones, ganaste!', '', {
                duration: 3000
            });
            this.clase = "bounce";
            this.CargarPuntaje(1);
        }
        else {
            this.snackBar.open('Respuesta incorrecta', '', {
                duration: 3000
            });
            if (this.Tiempo == 0)
                this.clase = "hinge";
            else 
                this.clase = "wobble";
            
            this.CargarPuntaje(0);
        }
    }

    CargarPuntaje(resultado: number) {
        if (resultado) {
            this.auth.SetPuntajeGano("agilidad");
        } else {
            this.auth.SetPuntajePerdio("agilidad");
        }

    }
}