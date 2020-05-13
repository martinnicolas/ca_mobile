import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { MisReclamosPage } from '../pages/mis-reclamos/mis-reclamos';
import { ApiRestV1Provider } from '../providers/api-rest-v1/api-rest-v1';
import { HttpClientModule } from '@angular/common/http';
import { VerReclamoPage } from '../pages/ver-reclamo/ver-reclamo';
import { FormReclamoPage } from '../pages/form-reclamo/form-reclamo';
import { IonicStorageModule } from '@ionic/storage';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { VerUbicacionPage } from '../pages/ver-ubicacion/ver-ubicacion';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    MisReclamosPage,
    FormReclamoPage,
    VerReclamoPage,
    VerUbicacionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, autoFocusAssist: false,
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo' ],
      dayShortNames: ['lun', 'mar', 'mier', 'jue', 'vie', 'sab', 'dom' ],
    }),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__ciudad_activa',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    MisReclamosPage,
    FormReclamoPage,
    VerReclamoPage,
    VerUbicacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiRestV1Provider,
    LocalStorageProvider,
    Geolocation,
    Camera,
    File
  ]
})
export class AppModule {}
