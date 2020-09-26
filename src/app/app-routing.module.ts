import { MemotestComponent } from './components/memotest/memotest.component';
// MODULOS
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTES
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component'
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './components/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './components/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from './components/listado/listado.component'
import { JuegosComponent } from './components/juegos/juegos.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component'
import { ListadoDePaisesComponent } from './components/listado-de-paises/listado-de-paises.component'
import { JugadoresListadoComponent } from './components/jugadores-listado/jugadores-listado.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { PptComponent } from './components/ppt/ppt.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';

//GUARDS
import { AuthGuard } from './guards/auth.guard';

const MiRuteo = [
    { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
    { path: 'Jugadores', component: JugadoresListadoComponent, canActivate: [AuthGuard] },
    { path: 'Login', component: LoginComponent },
    { path: 'QuienSoy', component: QuienSoyComponent, canActivate: [AuthGuard] },
    { path: 'Registro', component: RegistroComponent },
    { path: 'Principal', component: PrincipalComponent, canActivate: [AuthGuard] },
    { path: 'Listado', component: ListadoComponent, canActivate: [AuthGuard] },
    { path: 'Paises', component: ListadoDePaisesComponent, canActivate: [AuthGuard] },
    {   
        path: 'Juegos',
        component: JuegosComponent,
        children: [
            { path: '', component: MenuCardComponent },
            { path: 'Adivina', component: AdivinaElNumeroComponent },
            { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
            { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
            { path: 'Agilidad', component: AgilidadAritmeticaComponent },
            { path: 'Anagrama', component: AnagramaComponent },
            { path: 'Ahorcado', component: AhorcadoComponent },
            { path: 'Tateti', component: TatetiComponent },
            { path: 'Ppt', component: PptComponent },
            { path: 'Memotest', component: MemotestComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', pathMatch: 'full', component: PrincipalComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(MiRuteo)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule { }



