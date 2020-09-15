import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css'],
    providers: [
        AuthService
    ]
})
export class CabeceraComponent implements OnInit {

    public user$: Observable<any> = this.authSrv.afAuth.user;

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit() {
        
    }

    async onLogout() {
        try {
            Swal.close();
            await this.authSrv.logout();
            this.router.navigateByUrl('/Login');
        }
        catch(err) {
            console.log(err);
        }
    }
}
