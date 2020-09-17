import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

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
        console.info("Inicio agilidad");
        // this.usuarioLogueado = JSON.parse(localStorage.getItem('user'));

    }
    NuevoJuego() {
        this.ocultarVerificar = false;
        this.repetidor = setInterval(() => {

            this.Tiempo--;
            console.log("Tiempo restante:", this.Tiempo);
            if (this.Tiempo == 0) {
                clearInterval(this.repetidor);
                this.verificar();
                this.ocultarVerificar = true;
                this.Tiempo = 10;
                this.enviarJuego.emit(this.nuevoJuego);
            }
        }, 900);
        this.nuevoJuego = new JuegoAgilidad();
        console.info(this.nuevoJuego);
        console.info("Nuevos Valores");
        this.clase = "";

    }
    verificar() {
        //this.ocultarVerificar=false;
        //clearInterval(this.repetidor);

        if (this.nuevoJuego.verificar()) {
            this.ocultarVerificar = true;
            this.nuevoJuego.gano = true;
            this.enviarJuego.emit(this.nuevoJuego);
            clearInterval(this.repetidor);
            console.log("ganaste");
            this.snackBar.open('Felicitaciones, ganaste!', '', {
                duration: 3000
            });
            this.clase = "bounce";
            // this.CargarPuntaje(this.usuarioLogueado, 1);
            console.info(this.nuevoJuego);
        }
        else {
            console.log("perdiste");
            this.snackBar.open('Respuesta incorrecta', '', {
                duration: 3000
            });
            if (this.Tiempo == 0) {
                this.clase = "hinge";
            } else {
                this.clase = "wobble";
            }
            // this.CargarPuntaje(this.usuarioLogueado, 0);
        }
    }
    // CargarPuntaje(usuario, resultado) {
    //     if (resultado) {
    //         this.auth.SetPuntajeGano("agilidad", usuario);
    //     } else {
    //         this.auth.SetPuntajePerdio("agilidad", usuario);
    //     }

    // }
}