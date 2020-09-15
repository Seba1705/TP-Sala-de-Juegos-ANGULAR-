import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    providers: [
        AuthService
    ]
})
export class RegistroComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onRegister() {
        const { email, password } = this.registerForm.value;
        
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
                this.router.navigateByUrl('/Login');
            }
            else {
                Swal.fire({
                    text: 'Error',
                    icon: 'error',
                    title: 'Error al registrar',
                    confirmButtonColor: '#311B92',
                    showConfirmButton: true
                });
            }
                
        }
        catch(err) {
            Swal.fire({
                text: err.error.error.message,
                icon: 'error',
                title: 'Error al autenticar',
                confirmButtonColor: '#311B92',
                showConfirmButton: true
            });
        }
    }

}

