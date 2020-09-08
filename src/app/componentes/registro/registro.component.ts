import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  /* constructor( private miConstructor:FormBuilder) { }
    email=new FormControl('',[Validators.email]);
    formRegistro:FormGroup=this.miConstructor.group({
      usuario:this.email
    });*/


    usuario = {
        email: '',
        clave: '',
        reclave: ''
    };
      
    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    registro(form: NgForm) {

        if (form.invalid)
            Object.values(form.controls).forEach(control => control.markAsTouched());
        else 
          this.router.navigateByUrl('/Login');

    }

}
