// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RuteandoModule } from './ruteando/ruteando.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

// COMPONENTES
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from './componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './componentes/login/login.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from './componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { JugadoresListadoComponent } from './componentes/jugadores-listado/jugadores-listado.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { ListadoDePaisesComponent } from './componentes/listado-de-paises/listado-de-paises.component';
import { MapaDeGoogleComponent } from './componentes/mapa-de-google/mapa-de-google.component'
import { InputJugadoresComponent } from './componentes/input-jugadores/input-jugadores.component';

// SERVICIOS
import { JuegoServiceService } from './servicios/juego-service.service';
import { MiHttpService } from './servicios/mi-http/mi-http.service';
import { PaisesService } from './servicios/paises.service';
import { JugadoresService } from './servicios/jugadores.service';
import { ArchivosJugadoresService } from './servicios/archivos-jugadores.service';

// PIPES
import { SexoPipe } from './pipes/sexo.pipe';
import { environment } from '../environments/environment';

// VARIABLES

@NgModule({
    declarations: [
        AppComponent,
        AdivinaElNumeroComponent,
        ListadoDeResultadosComponent,
        ErrorComponent,
        PrincipalComponent,
        LoginComponent,
        AgilidadAritmeticaComponent,
        MenuComponent,
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
        SexoPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RuteandoModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
        // AgmCoreModule.forRoot({
        //   apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
        // })
        // NgbModule.forRoot(MiRuteo),
        // importo el ruteo
        // RouterModule.forRoot(MiRuteo)
    ],
    providers: [JuegoServiceService, MiHttpService, PaisesService, ArchivosJugadoresService, JugadoresService],
    bootstrap: [AppComponent]
})
export class AppModule { }
