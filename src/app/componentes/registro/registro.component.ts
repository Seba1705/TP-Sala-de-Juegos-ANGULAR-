import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })

    constructor() { }

    ngOnInit(): void {
    }

    onRegister() {
        // this.authService.register()
        console.log(this.registerForm.value);
    }

}
