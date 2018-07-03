import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'angular-calendar'
import { ImageUploadModule } from 'angular2-image-upload';
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NouisliderModule } from 'ng2-nouislider';
import { StarRatingModule } from 'angular-star-rating';

//

import { registerLocaleData } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
registerLocaleData(localeCL);

import 'rxjs';




import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { PropDeValorComponent } from './component/prop-de-valor/prop-de-valor.component';
import { LugaresDestacadosComponent } from './component/lugares-destacados/lugares-destacados.component';
import { EnPrensaComponent } from './component/en-prensa/en-prensa.component';
import { DescargaTuAppComponent } from './component/descarga-tu-app/descarga-tu-app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {NgdbRatingDecimalComponent} from './component/ngdb-rating-decimal/ngdb-rating-decimal.component';
import { NosotrosComponent } from './component/nosotros/nosotros.component';
import { ContactoComponent } from './component/contacto/contacto.component';
import { ProveedoresComponent } from './component/proveedores/proveedores.component';
import { PerfilComponent } from './perfil-usuario/perfil/perfil.component';
import { ActividadesComponent } from './perfil-usuario/actividades/actividades.component';
import { ComunidadesComponent } from './perfil-usuario/comunidades/comunidades.component';
import { ResultadosComponent } from './resultados-buscador/resultados/resultados.component';
import { FiltrosComponent } from './resultados-buscador/filtros/filtros.component';
import { EditarPerfilComponent } from './perfil-usuario/editar-perfil/editar-perfil.component';
import { ResultadosMapaComponent } from './resultados-buscador/resultados-mapa/resultados-mapa.component';
import { DetallesComponent } from './resultados-buscador/detalles/detalles.component';
import { DashboardComponent } from './perfil-proveedor/dashboard/dashboard.component';
import { NuevaPublicacionComponent } from './perfil-proveedor/nueva-publicacion/nueva-publicacion.component';
import { ResumenComponent } from './perfil-proveedor/resumen/resumen.component';
import { CreacionProveedorComponent } from './admin/creacion-proveedor/creacion-proveedor.component';
// SERVICES

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AgregarHijoComponent } from './perfil-usuario/agregar-hijo/agregar-hijo.component';
import { AgregarPersonaComponent } from './perfil-usuario/agregar-persona/agregar-persona.component';
import { NavbarVisibleService } from './services/navbar-visible.service';
import { ActividadesService } from './services/actividades.service';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { ValidateProviderService } from './services/validate-provider.service';
import { AuthProviderService } from './services/auth-provider.service';
import { ProviderService } from './services/provider.service';
import { LoginProveedorComponent } from './component/login-proveedor/login-proveedor.component';
import { AutocompleteDirective } from './directives/autocomplete.directive';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { HorariosFilterPipe } from './pipes/horarios-filter.pipe';
import { PromocionesComponent } from './admin/promociones/promociones.component';
import { MisPublicacionesComponent } from './perfil-proveedor/mis-publicaciones/mis-publicaciones.component';
import { AgregarTarjetaComponent } from './perfil-usuario/agregar-tarjeta/agregar-tarjeta.component';
import { WebpayService } from './services/webpay.service';
import { FilterAoPPipe } from './pipes/filterAoP.pipe';
import { FiltroPrecioPipe } from './pipes/filtro-precio.pipe';
import { FiltroComunaPipe } from './pipes/filtro-comuna.pipe';
import { AutocompleteComunasDirective } from './directives/autocomplete-comunas.directive';
import { FiltroGeneralPipe } from './pipes/filtro-general.pipe';
import { ResultadosListaComponent } from './resultados-buscador/resultados-lista/resultados-lista.component';
import { FiltrosListaComponent } from './resultados-buscador/filtros-lista/filtros-lista.component';
import { FiltroGeneralListaPipe } from './pipes/filtro-general-lista.pipe';
import { FacebookComponent } from './perfil-usuario/facebook/facebook.component';


//SOCIAL LOGIN

import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng4-social-login';
const CONFIG = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('921468971366900')
  }
],
  true);

  export function provideConfig() {
    return CONFIG;
  }

//ROUTES

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegisterComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'resultados/calendario', component: ResultadosComponent},
  {path: 'resultados/lista', component: ResultadosListaComponent},
  {path: 'usuarios/perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/facebook/:token', component: FacebookComponent},
  {path: 'usuarios/actividades', component: ActividadesComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/comunidades', component: ComunidadesComponent, canActivate:[AuthGuard]}, 
  {path: 'usuarios/perfil/editar', component: EditarPerfilComponent, canActivate:[AuthGuard]},
  {path: 'resultados/detalles/:nombre/:id', component: DetallesComponent},
  {path: 'proveedores/login', component: LoginProveedorComponent},
  {path: 'proveedores/perfil', component: ResumenComponent},
  {path: 'proveedores/perfil/nueva-publicacion', component: NuevaPublicacionComponent},
  {path: 'proveedores/perfil/mis-publicaciones', component: MisPublicacionesComponent},
  {path: 'admin/creacion-proveedor', component: CreacionProveedorComponent},
  {path: 'admin/promociones', component: PromocionesComponent}
  
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    PropDeValorComponent,
    LugaresDestacadosComponent,
    EnPrensaComponent,
    DescargaTuAppComponent,
    LoginComponent,
    RegisterComponent,
    NgdbRatingDecimalComponent,
    NosotrosComponent,
    ContactoComponent,
    ProveedoresComponent,
    PerfilComponent, 
    ActividadesComponent,
    ComunidadesComponent,
    ResultadosComponent,
    FiltrosComponent,
    EditarPerfilComponent,
    ResultadosMapaComponent,
    DetallesComponent,
    DashboardComponent,
    AgregarHijoComponent,
    AgregarPersonaComponent,
    OrderByDatePipe,
    NuevaPublicacionComponent,
    ResumenComponent,
    CreacionProveedorComponent,
    LoginProveedorComponent,
    AutocompleteDirective,
    DateFilterPipe,
    HorariosFilterPipe,
    PromocionesComponent,
    MisPublicacionesComponent,
    AgregarTarjetaComponent,
    FilterAoPPipe,
    FiltroPrecioPipe,
    FiltroComunaPipe,
    AutocompleteComunasDirective,
    FiltroGeneralPipe,
    ResultadosListaComponent,
    FiltrosListaComponent,
    FiltroGeneralListaPipe,
    FacebookComponent

 
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatProgressSpinnerModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    FileUploadModule,
    CalendarModule.forRoot(),
    ImageUploadModule.forRoot(),
    FullCalendarModule,
    NouisliderModule,
    StarRatingModule.forRoot(),
    SocialLoginModule,
    HttpClientModule

  ],
  providers: [ValidateService, AuthService, AuthGuard, NavbarVisibleService,
              ActividadesService, ValidateProviderService, AuthProviderService,
              ProviderService, WebpayService,    {
                provide: AuthServiceConfig,
                useFactory: provideConfig
              }],
  bootstrap: [AppComponent]
})

export class AppModule { }
