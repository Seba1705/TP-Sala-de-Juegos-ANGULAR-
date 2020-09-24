// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";

// COMPONENTES
import { ListadoDeResultadosComponent } from './components/listado-de-resultados/listado-de-resultados.component';
import { ErrorComponent } from './components/error/error.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './components/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './components/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from './components/listado/listado.component';
import { JugadoresListadoComponent } from './components/jugadores-listado/jugadores-listado.component';
import { ListadosComponent } from './components/listados/listados.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { ListadoDePaisesComponent } from './components/listado-de-paises/listado-de-paises.component';
import { MapaDeGoogleComponent } from './components/mapa-de-google/mapa-de-google.component'
import { InputJugadoresComponent } from './components/input-jugadores/input-jugadores.component';
import { PptComponent } from './components/ppt/ppt.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AppComponent } from "./app.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';

// SERVICIOS
import { JuegoServiceService } from './servicios/juego-service.service';
import { MiHttpService } from './servicios/mi-http/mi-http.service';
import { PaisesService } from './servicios/paises.service';
import { JugadoresService } from './servicios/jugadores.service';
import { AuthService } from './services/auth.service';
import { ArchivosJugadoresService } from './servicios/archivos-jugadores.service';
import { AuthGuard } from './guards/auth.guard';

// PIPES
import { SexoPipe } from './pipes/sexo.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TituloComponent } from './components/titulo/titulo.component';


@NgModule({
    declarations: [
        AppComponent,
        AdivinaElNumeroComponent,
        ListadoDeResultadosComponent,
        ErrorComponent,
        PrincipalComponent,
        LoginComponent,
        AgilidadAritmeticaComponent,
        AdivinaMasListadoComponent,
        AgilidadMasListadoComponent,
        ListadoComponent,
        ListadosComponent,
        JuegosComponent,
        RegistroComponent,
        MenuCardComponent,
        CabeceraComponent,
        QuienSoyComponent,
        AnagramaComponent,
        ListadoDePaisesComponent,
        MapaDeGoogleComponent,
        JugadoresListadoComponent,
        InputJugadoresComponent,
        SexoPipe,
        PptComponent,
        AhorcadoComponent,
        TatetiComponent,
        TituloComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [
        JuegoServiceService, 
        MiHttpService, 
        PaisesService, 
        ArchivosJugadoresService, 
        JugadoresService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
