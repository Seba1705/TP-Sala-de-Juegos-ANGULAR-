import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        repass: new FormControl('')
    })

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    onRegister() {
        // this.authService.register()
        console.log(this.registerForm.value);
    }

}
