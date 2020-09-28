import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DbServiceService } from '../../services/db.service';

@Component({
    selector: 'app-listado-de-resultados',
    templateUrl: './listado-de-resultados.component.html',
    styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

    isLoading: boolean = false;
    @Input()
    listado: Array<any>;
    listadoPpt: Array<any>;
    listadoOp: Array<any>;
    listadoNs: Array<any>;
    listadoTateti: Array<any>;
    listadoAhorcado: Array<any>;
    listadoMemo: Array<any>;

    constructor(private dbService: DbServiceService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.dbService.GetResults("anagrama")
            .then(result => {
                this.isLoading = false;
                this.listado = result;
            })

        this.dbService.GetResults("agilidad")
            .then(result => {
                this.isLoading = false;
                this.listadoOp = result;
            })

        this.dbService.GetResults("adivina")
            .then(result => {
                this.isLoading = false;
                this.listadoNs = result;
            })

        this.dbService.GetResults("Piedra, papel o tijera")
            .then(result => {
                this.isLoading = false;
                this.listadoPpt = result;
            })

        this.dbService.GetResults("tateti")
            .then(result => {
                this.isLoading = false;
                this.listadoTateti = result;
            })

        this.dbService.GetResults("ahorcado")
            .then(result => {
                this.isLoading = false;
                this.listadoAhorcado = result;
            })
        
        this.dbService.GetResults("memotest")
            .then(result => {
                this.isLoading = false;
                this.listadoMemo = result;
            })

    }

    ver() {
        console.info(this.listado);
    }
}