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
import { NuevoReclamoPage } from '../pages/nuevo-reclamo/nuevo-reclamo';
import { ApiRestV1Provider } from '../providers/api-rest-v1/api-rest-v1';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    MisReclamosPage,
    NuevoReclamoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    MisReclamosPage,
    NuevoReclamoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiRestV1Provider,
  ]
})
export class AppModule {}
