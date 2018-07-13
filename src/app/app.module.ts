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

import { CookieService } from 'angular2-cookie/services/cookies.service';

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

import { ResultadosComponent } from './resultados-buscador/resultados/resultados.component';
import { FiltrosComponent } from './resultados-buscador/filtros/filtros.component';

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
import { ReviewsService } from './services/reviews.service';
import { AuthProviderService } from './services/auth-provider.service';
import { ProviderService } from './services/provider.service';
import { LoginProveedorComponent } from './component/login-proveedor/login-proveedor.component';
import { AutocompleteDirective } from './directives/autocomplete.directive';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { HorariosFilterPipe } from './pipes/horarios-filter.pipe';
import { PromocionesComponent } from './admin/promociones/promociones.component';
import { MisPublicacionesComponent } from './perfil-proveedor/mis-publicaciones/mis-publicaciones.component';
import { AgregarTarjetaComponent } from './perfil-usuario/agregar-tarjeta/agregar-tarjeta.component';
import { TransaccionesService } from './services/transacciones.service';
import { WebpayService } from './services/webpay.service';
import { FilterAoPPipe } from './pipes/filterAoP.pipe';
import { FiltroPrecioPipe } from './pipes/filtro-precio.pipe';
import { FiltroComunaPipe } from './pipes/filtro-comuna.pipe';
import { AutocompleteComunasDirective } from './directives/autocomplete-comunas.directive';
import { FiltroGeneralPipe } from './pipes/filtro-general.pipe';
import { ResultadosListaComponent } from './resultados-buscador/resultados-lista/resultados-lista.component';
import { FiltrosListaComponent } from './resultados-buscador/filtros-lista/filtros-lista.component';
import { FiltroGeneralListaPipe } from './pipes/filtro-general-lista.pipe';
import { HijosComponent } from './perfil-usuario/hijos/hijos.component';
import { CuidadoresComponent } from './perfil-usuario/cuidadores/cuidadores.component';
import { PagoComponent } from './perfil-usuario/pago/pago.component';
import { NotificacionesComponent } from './perfil-usuario/notificaciones/notificaciones.component';
import { SubnavbarComponent } from './perfil-usuario/subnavbar/subnavbar.component';
import { IndicadorCompletitudComponent } from './perfil-usuario/indicador-completitud/indicador-completitud.component';
import { SubnavbarComprasComponent } from './compras-usuario/subnavbar-compras/subnavbar-compras.component';
import { ComprasComponent } from './compras-usuario/compras/compras.component';
import { CreditosComponent } from './compras-usuario/creditos/creditos.component';
import { FavoritosComponent } from './compras-usuario/favoritos/favoritos.component';

import { NotificacionesComprasComponent } from './compras-usuario/notificaciones-compras/notificaciones-compras.component';
import { ResenasComponent } from './compras-usuario/resenas/resenas.component';
import { ImageCropperComponent } from 'ngx-img-cropper';





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
  {path: 'resultados/mapa', component: ResultadosMapaComponent},
  {path: 'usuarios/perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/hijos', component: HijosComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/cuidadores', component: CuidadoresComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/pago', component: PagoComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/notificaciones', component: NotificacionesComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/mis-compras', component: ComprasComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/mis-compras/creditos', component: CreditosComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/mis-compras/favoritos', component: FavoritosComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/mis-compras/resenas', component: ResenasComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/mis-compras/notificaciones', component: NotificacionesComprasComponent, canActivate:[AuthGuard]},
  {path: 'usuarios/actividades', component: ActividadesComponent, canActivate:[AuthGuard]},
  {path: 'resultados/detalles/:id', component: DetallesComponent},
  {path: 'proveedores/login', component: LoginProveedorComponent},
  {path: 'proveedores/perfil/panel', component: ResumenComponent},
  {path: 'proveedores/perfil/crear-actividad', component: NuevaPublicacionComponent},
  {path: 'proveedores/perfil/calendario', component: MisPublicacionesComponent},
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
    ResultadosComponent,
    FiltrosComponent,   
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
    HijosComponent,
    CuidadoresComponent,
    PagoComponent,
    NotificacionesComponent,
    SubnavbarComponent,
    IndicadorCompletitudComponent,
    SubnavbarComprasComponent,
    ComprasComponent,
    CreditosComponent,
    FavoritosComponent,
    NotificacionesComprasComponent,
    ResenasComponent,
    ImageCropperComponent
 
 
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
    HttpClientModule

  ],
  providers: [ValidateService, AuthService, AuthGuard, NavbarVisibleService,
              ActividadesService, ValidateProviderService, AuthProviderService,
              ProviderService, WebpayService, TransaccionesService, ReviewsService,
              CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
