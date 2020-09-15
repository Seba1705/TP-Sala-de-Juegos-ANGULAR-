import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [
        AuthService
    ]
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    })

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onLogin() {
        const { email, password } = this.loginForm.value;

        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();

        try {
            const user = await this.authSrv.login(email, password);
            if (user) {
                Swal.close();
                this.router.navigateByUrl('/Principal');
            }
            else {
                Swal.fire({
                    text: 'Verifique las credenciales ingresadas',
                    icon: 'error',
                    title: 'Error al autenticar'
                });
            }

        }
        catch(err) {
            Swal.fire({
                text: err,
                icon: 'error',
                title: 'Error al autenticar'
            });
        }
    }


    // private subscription: Subscription;
    // usuario = '';
    // clave= '';
    // progreso: number;
    // progresoMensaje="esperando..."; 
    // logeando=true;
    // ProgresoDeAncho:string;

    // clase="progress-bar progress-bar-info progress-bar-striped ";

    // constructor(
    //     private route: ActivatedRoute,
    //     private router: Router) {
    //       this.progreso=0;
    //       this.ProgresoDeAncho="0%";

    // }

    // ngOnInit() {
    // }

    // Entrar() {
    //     if (this.usuario === 'admin' && this.clave === 'admin') {
    //         this.router.navigate(['/Principal']);
    //     }
    // }
    // MoverBarraDeProgreso() {

    //   this.logeando=false;
    //   this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    //   this.progresoMensaje="NSA spy..."; 
    //   let timer = TimerObservable.create(200, 50);
    //   this.subscription = timer.subscribe(t => {
    //     console.log("inicio");
    //     this.progreso=this.progreso+1;
    //     this.ProgresoDeAncho=this.progreso+20+"%";
    //     switch (this.progreso) {
    //       case 15:
    //       this.clase="progress-bar progress-bar-warning progress-bar-striped active";
    //       this.progresoMensaje="Verificando ADN..."; 
    //         break;
    //       case 30:
    //         this.clase="progress-bar progress-bar-Info progress-bar-striped active";
    //         this.progresoMensaje="Adjustando encriptación.."; 
    //         break;
    //         case 60:
    //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
    //         this.progresoMensaje="Recompilando Info del dispositivo..";
    //         break;
    //         case 75:
    //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
    //         this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
    //         break;
    //         case 85:
    //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
    //         this.progresoMensaje="Instalando KeyLogger..";
    //         break;

    //       case 100:
    //         console.log("final");
    //         this.subscription.unsubscribe();
    //         this.Entrar();
    //         break;
    //     }     
    //   });
    //   //this.logeando=true;
    // }


  
}
