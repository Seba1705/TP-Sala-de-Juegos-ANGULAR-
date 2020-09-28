import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-ppt',
    templateUrl: './ppt.component.html',
    styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
    }

    scores = [0, 0];
    weapons = [
        'piedra',
        'papel',
        'tijera'
    ]
    arma: string;
    arma2: string;
    playerSelected = -1;
    loading = false;
    isResultShow = false;
    jugo: boolean = false;

    // theResult -  0 winner
    //              1 lose
    //              2 tie
    theResult = 0
    enemySelected = -1;

    pick(weapon: number): void {
        this.enemySelected = -1;
        if (this.loading) return;
        this.loading = true;
        this.playerSelected = weapon;
        this.jugo = true;

        if (this.playerSelected == 0)
            this.arma = "Piedra";
        else if (this.playerSelected == 1) 
            this.arma = "Papel";
        else 
            this.arma = "Tijera";
        
        //create a delay to simulate enemy's turn.
        setTimeout(() => {
            this.loading = false;
            // generate a number from 0 -2 
            const randomNum = Math.floor(Math.random() * 3);
            this.enemySelected = randomNum;

            if (this.enemySelected == 0) 
                this.arma2 = "Piedra";
            else if (this.enemySelected == 1) 
                this.arma2 = "Papel";
            else 
                this.arma2 = "Tijera";
            
            this.checkResult();
            this.isResultShow = true;
        }, 2000);
    }

    checkResult(): void {
        const playerPick = this.playerSelected;
        const enemyPick = this.enemySelected;
        if (playerPick == enemyPick) {
            this.theResult = 2;
        }
        else if ((playerPick - enemyPick + 3) % 3 == 1) {
            // YOU WIN
            this.theResult = 0;
            this.scores[0] = this.scores[0] + 1;
            this.CargarPuntaje(1);
        }
        else {
            // YOU LOSE
            this.theResult = 1;
            this.scores[1] = this.scores[1] + 1;
            this.CargarPuntaje(0);
        }
    }

    CargarPuntaje(resultado: number) {
        if(resultado)
            this.auth.SetPuntajeGano("Piedra, papel o tijera");
        else
            this.auth.SetPuntajePerdio("Piedra, papel o tijera");
    }
}