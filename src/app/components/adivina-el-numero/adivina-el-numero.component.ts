import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JuegoAdivina } from '../../clases/juego-adivina'

@Component({
    selector: 'app-adivina-el-numero',
    templateUrl: './adivina-el-numero.component.html',
    styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
    @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

    nuevoJuego: JuegoAdivina;
    Mensajes: string;
    contador: number;
    ocultarVerificar: boolean;

    constructor(public auth: AuthService) {
        this.nuevoJuego = new JuegoAdivina();
        console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
        this.ocultarVerificar = false;
    }
    generarnumero() {
        this.nuevoJuego.generarnumero();
        this.contador = 0;
    }
    verificar() {
        this.contador++;
        this.ocultarVerificar = true;
        if (this.nuevoJuego.verificar()) {
            this.enviarJuego.emit(this.nuevoJuego);
            this.CargarPuntaje(1);
            this.MostarMensaje("GANASTE!", true);
            this.nuevoJuego.numeroSecreto = 0;
        } else {

            let mensaje: string;
            switch (this.contador) {
                case 1:
                    mensaje = "No, intento fallido, animo";
                    break;
                case 2:
                    mensaje = "No,te estaras acercando?";
                    break;
                case 3:
                    mensaje = "No es, crei que la tercera era la vencida.";
                    break;
                case 4:
                    mensaje = "No es el  " + this.nuevoJuego.numeroIngresado;
                    break;
                case 5:
                    mensaje = "Perdiste, se te acabaron los intentos";
                    break;
                case 6:
                    mensaje = "Afortunado en el amor...";
                    break;

                default:
                    mensaje = "Ya le erraste " + this.contador + " veces";
                    break;
            }
            if (this.contador < 5) {
                this.MostarMensaje("#" + this.contador + ": " + mensaje + ", Tip :" + this.nuevoJuego.retornarAyuda());
            } else {
                this.MostarMensaje("#" + this.contador + ": " + mensaje);
                this.CargarPuntaje(0);
                this.enviarJuego.emit(this.nuevoJuego);
                this.nuevoJuego.numeroSecreto = 0;
            }
            console.info("numero Secreto:", this.nuevoJuego.gano);
        }
    }

    MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
        this.Mensajes = mensaje;
        var x = document.getElementById("snackbar");
        if (ganador) {
            x.className = "show Ganador";
        } else {
            x.className = "show Perdedor";
        }
        var modelo = this;
        setTimeout(function () {
            x.className = x.className.replace("show", "");
            modelo.ocultarVerificar = false;
        }, 3000);
    }


    CargarPuntaje(resultado) {
        if (resultado) {
            this.auth.SetPuntajeGano("adivina");
        } else {
            this.auth.SetPuntajePerdio("adivina");
        }
    }

    ngOnInit() {
        this.contador = 0;
    }

}