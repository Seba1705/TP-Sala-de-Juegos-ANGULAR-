import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal  from 'sweetalert2';

@Component({
    selector: 'app-ahorcado',
    templateUrl: './ahorcado.component.html',
    styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

    letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    palabras = ["JUEGO", "AVION", "PROMOCION", "MONEDA", "COMPUTADORA", "CERVEZA", "ESCALAR",
        "PESCADO", "LAGO", "BOSQUE", "CAMARA", "ZAPATILLA", "SER", "PAIS",
        "VINOTECA", "MONTAÑA", "JUPITER", "EXTRATERRESTRE", "DIFICIL", "ABURRIDO", "AYUDA"];
    palabraAAdivinar: string;
    palabraAdivinadaPorAhora: string;
    fallos: Array<string>;
    numeroDeFallos: number;

    constructor(public auth: AuthService) {

    }

    ngOnInit() {
        this.initGame();
    }

    initGame() {
        this.numeroDeFallos = 0;
        this.palabraAdivinadaPorAhora = '';
        this.fallos = [];
        let numero = Math.floor(Math.random() * this.palabras.length);
        this.palabraAAdivinar = this.palabras[numero];
        this.generarPalabraAdivinadaPorAhora();
    }

    generarPalabraAdivinadaPorAhora() {
        this.palabraAdivinadaPorAhora = '';
        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            this.palabraAdivinadaPorAhora += '_';

        }
        console.log(this.palabraAAdivinar);
    }

    letraPresionada(letra: string) {
        if (!this.letraAcertada(letra)) {
            if (this.numeroDeFallos < 6)
                this.aumentarFallos(letra);
            else
                this.mostrarMensajeDePerdedor();
        }
    }

    letraAcertada(letra: string): boolean {
        let longitud = this.palabraAAdivinar.length;
        let letraAcertada = false;
        for (let i = 0; i < longitud; i++) {
            if (letra == this.palabraAAdivinar[i]) {
                this.palabraAdivinadaPorAhora = (i == 0 ? '' : this.palabraAdivinadaPorAhora.substr(0, i)) + letra + this.palabraAdivinadaPorAhora.substr(i + 1);
                letraAcertada = true;
            }
        }
        return letraAcertada;
    }

    aumentarFallos(letra: string) {
        this.fallos.push(letra);
        this.numeroDeFallos++;
    }

    mostrarMensajeDePerdedor() {
        Swal.fire({
            icon: 'error',
            title: 'Perdiste!!!',
            showCancelButton: true,
            confirmButtonText: `Jugar de Nuevo`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.initGame();
            } 
        })
    }
}


