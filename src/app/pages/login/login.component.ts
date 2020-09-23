import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/app.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../assets//css/main.css', '../assets/css/util.css']
})
export class LoginComponent implements OnInit {
    usuario: UsuarioModel = new UsuarioModel();
    recordarme = false;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        if (localStorage.getItem('email')) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
        }   
    }

    onLogin(formulario: NgForm) {
        if (formulario.invalid) return;
        
        Swal.fire({
            text: 'Espere por favor',
            allowOutsideClick: false,
            icon: 'info'
        });

        Swal.showLoading();

        this.auth.login(this.usuario)
            .subscribe(
                (resp) => {
                    if (this.recordarme)
                        localStorage.setItem('email', this.usuario.email);
    
                    Swal.close();
                    this.auth.enviarMensaje(true);
                    this.router.navigateByUrl('/Principal');
                },
                (err) => {
                    Swal.fire({
                        text: err.error.error.message,
                        icon: 'error',
                        title: 'Error al autenticar',
                        confirmButtonColor: '#311B92',
                    });
            }
        );
    }

    cargarAdmin() {
        this.usuario.email = 'invitado@invitado.com';
        this.usuario.password = '22222222'; 
    }
}
