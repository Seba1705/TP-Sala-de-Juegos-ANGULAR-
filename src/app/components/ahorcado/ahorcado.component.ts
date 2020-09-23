import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal  from 'sweetalert2';

@Component({
    selector: 'app-ahorcado',
    templateUrl: './ahorcado.component.html',
    styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

    letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    palabras = ["JUEGO", "AVION", "PROMOCION", "MONEDA", "COMPUTADORA", "CERVEZA", "ESCALAR", "PESCADO", "LAGO", "BOSQUE", "CAMARA", "ZAPATILLA", "SER", "PAIS", "VINOTECA", "MONTAÑA", "JUPITER", "EXTRATERRESTRE", "DIFICIL", "ABURRIDO", "AYUDA"];
    palabraAAdivinar: string;
    palabraAdivinadaPorAhora: string;
    fallos: Array<string>;
    numeroDeFallos: number;
    numeroDeAciertos: number;
    botones: Array<{letra: string, estado: string}>;

    constructor(public auth: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.initGame();
    }

    initGame() {
        this.botones = [];
        this.numeroDeFallos = 0;
        this.numeroDeAciertos = 0;
        this.palabraAdivinadaPorAhora = '';
        this.fallos = [];
        let numero = Math.floor(Math.random() * this.palabras.length);
        this.palabraAAdivinar = this.palabras[numero];
        this.generarPalabraAdivinadaPorAhora();
        this.inicializarBotones();
    }

    generarPalabraAdivinadaPorAhora() {
        this.palabraAdivinadaPorAhora = '';
        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            this.palabraAdivinadaPorAhora += '_';

        }
        console.log(this.palabraAAdivinar);
    }

    letraPresionada(boton: {letra: string, estado: string}) {   
        if (boton.estado === 'noAcertado' || boton.estado === 'acertado')
            return;

        if (!this.letraAcertada(boton.letra)) {
            if (this.numeroDeFallos < 7) {
                this.aumentarFallos(boton.letra);
                if(this.numeroDeFallos == 7) 
                    this.mostrarMensajeDePerdedor();
            }
            else
                this.mostrarMensajeDePerdedor();

            boton.estado = 'noAcertado';
        }
        else {
            if(this.numeroDeAciertos == this.palabraAAdivinar.length) {
                this.mostrarMensajeDeGanador();
            }
            boton.estado = 'acertado';
        }
    }

    letraAcertada(letra: string): boolean {
        let longitud = this.palabraAAdivinar.length;
        let letraAcertada = false;
        for (let i = 0; i < longitud; i++) {
            if (letra == this.palabraAAdivinar[i]) {
                this.palabraAdivinadaPorAhora = (i == 0 ? '' : this.palabraAdivinadaPorAhora.substr(0, i)) + letra + this.palabraAdivinadaPorAhora.substr(i + 1);
                letraAcertada = true;
                this.numeroDeAciertos++;

            }
        }
        return letraAcertada;
    }

    aumentarFallos(letra: string) {
        this.fallos.push(letra);
        this.numeroDeFallos++;
    }

    mostrarMensajeDePerdedor() {
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Perdiste!!!',
                text: 'Qué lástima! ¿Querés jugar de nuevo?',
                showCancelButton: true,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#311B92'   
            }).then((result) => {
                if (result.isConfirmed) {
                    this.initGame();
                } else {
                    this.router.navigateByUrl('/Principal');
                }
            })
        }, 500);
        console.log('Perdiste');
    }

    mostrarMensajeDeGanador() {
        Swal.fire({
            icon: 'info',
            title: 'Ganaste!!!',
            text: 'Felicitaciones, has ganado. ¿Quieres jugar de nuevo?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#311B92'
        }).then((result) => {
            if (result.isConfirmed) {
                this.initGame();
            } 
            else {
                this.router.navigateByUrl('/Principal');
            }
        })
        console.log('Ganaste');
    }
    
    inicializarBotones() {
        const longitud = this.letras.length;
        for(let i = 0; i < longitud; i++) {
            this.botones.push({letra: this.letras[i], estado: 'noPresionado'});
        }
    }
}


