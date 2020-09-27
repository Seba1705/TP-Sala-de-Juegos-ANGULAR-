import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/app.models';
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

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('email')) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
        }
    }

    async onLogin(formulario: NgForm) {
        if (formulario.invalid) return;

        const { email, password } = formulario.value;

        try {
            const user = await this.authSrv.login(email, password);
            
            if (user) {
                Swal.close();
                this.router.navigateByUrl('Principal');
                console.log(user.uid);
            }
        }
        catch (err) {
            console.log( 'Login', err);
        }
    }

    cargarInvitado() {
        this.usuario.email = 'invitado@invitado.com';
        this.usuario.password = '22222222';
    }

    cargarAdmin() {
        this.usuario.email = 'admin@admin.com';
        this.usuario.password = '11111111';
    }
}
