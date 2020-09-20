import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/app.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
      selector: 'app-registro',
      templateUrl: './registro.component.html',
      styleUrls: ['../assets//css/main.css', '../assets/css/util.css']
})
export class RegistroComponent implements OnInit {
      usuario: UsuarioModel = new UsuarioModel();
      recordarme = true;
    
      constructor(private auth: AuthService, private router: Router) {}
    
      ngOnInit() {
            if (localStorage.getItem('email')) {
                  this.usuario.email = localStorage.getItem('email');
                  this.recordarme = true;
            }   
      }
    
      onRegister(formulario: NgForm) {
            if (formulario.invalid) return;
              
            Swal.fire({
                  text: 'Espere por favor',
                  allowOutsideClick: false,
                  icon: 'info'
            });

            Swal.showLoading();

            this.auth.nuevoUsuario(this.usuario).subscribe(
                  (resp) => {
                        Swal.close();
                        if (this.recordarme)
                              localStorage.setItem('email', this.usuario.email);
                        this.router.navigateByUrl('/Login');
                  },
                  (err) => {
                        Swal.fire({
                              text: err.error.error.message,
                              icon: 'error',
                              title: 'Error al registrar',
                              confirmButtonColor: '#311B92',
                        });
                  }
            );
      }
}
