import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-anagrama',
    templateUrl: './anagrama.component.html',
    styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
    score;
    answer;
    letters = [];
    seconds = 30;
    letterAnimation = 0;
    timerPromise;
    correctWord = '';
    words = ["JUEGO", "AVION", "PROMOCION", "MONEDA", "COMPUTADORA", "CERVEZA", "ESCALAR",
        "PESCADO", "LAGO", "BOSQUE", "CAMARA", "ZAPATILLA", "SER", "PAIS",
        "VINOTECA", "MONTAÑA", "JUPITER", "EXTRATERRESTRE", "DIFICIL", "ABURRIDO", "AYUDA"];
    usuarioLogueado: any;

    constructor(private snackBar: MatSnackBar, public auth: AuthService) {
        this.usuarioLogueado = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.initGame();
    }

    initGame() {
        if (this.score > 0) {
        }
        this.seconds = 30;
        this.score = 0;
        this.answer = '';
        this.displayWord();
        this.contador();
    }


    isLetterVisible = () => {
        return this.letterAnimation === 1;
    }

    isLetterHiding = () => {
        return this.letterAnimation === 2;
    }

    isCorrectLetter = () => {
        return this.letterAnimation === 3;
    }

    validateWord = () => {
        if (this.seconds > 0) {
            if (this.answer.toUpperCase() === this.correctWord) {
                this.score += 1;
                this.letterAnimation = 3;
                this.timerPromise = setTimeout(this.displayWord, 1000);
            }
        } else {
            console.info("Timeout!");
        }
    }

    nextWord = () => {
        this.answer = ' ';
        this.letterAnimation = 2;
        this.timerPromise = setTimeout(this.displayWord, 1000);
    }

    displayWord = () => {
        this.answer = '';
        const wordIndex = Math.floor(Math.random() * this.words.length);
        this.correctWord = this.words[wordIndex];
        this.letters = this.correctWord.split('');
        this.getRandomIndexes();
        this.timerPromise = setTimeout(() => { this.letterAnimation = 1; }, 100);
    }

    getRandomIndexes = () => {
        var randomIndex;
        var size = this.letters.length;
        var temp;
        while (size > 0) {
            randomIndex = Math.floor(Math.random() * size--);
            temp = this.letters[size];
            this.letters[size] = this.letters[randomIndex];
            this.letters[randomIndex] = temp;
        }
    }

    contador() {
        setTimeout(() => {
            if (this.seconds > 0)
                this.seconds--;
            this.contador();
        }, 1000);
    }

    CargarPuntaje() {
        // this.auth.SetPuntajeAnagrama(this.score, "anagrama", this.usuarioLogueado);
        this.snackBar.open('Resultados cargados', '', {
            duration: 3000
        });

    }

}