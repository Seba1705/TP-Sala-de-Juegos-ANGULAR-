import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/app.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
      selector: 'app-registro',
      templateUrl: './registro.component.html',
      styleUrls: ['../assets//css/main.css', '../assets/css/util.css']
})
export class RegistroComponent implements OnInit {
      usuario: UsuarioModel = new UsuarioModel();
      recordarme = true;

      constructor(private authSrv: AuthService, private router: Router) { }

      ngOnInit() {
            if (localStorage.getItem('email')) {
                  this.usuario.email = localStorage.getItem('email');
                  this.recordarme = true;
            }   
      }
      async onRegister(formulario: NgForm) {
            if (formulario.invalid) return;

            const { email, password } = formulario.value;

            try {
                  const user = await this.authSrv.register(email, password);
                  if (user)
                        this.router.navigateByUrl('Login')
            }
            catch (err) {
                  console.error(err)
            }
      }
}
