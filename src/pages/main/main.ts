import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform, App, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MisReclamosPage } from '../mis-reclamos/mis-reclamos';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{icon: string, title: string, component: any}>;
  platform: Platform;
  app: App;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    platform: Platform,
    app: App) {
    this.platform = platform;
    this.app = app;

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      { icon: 'pin', title: 'Mis Reclamos', component: MisReclamosPage }
    ];
    // userd for prevent showing login on pressing back button
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'HomePage' || activeView.name === 'MisReclamosPage') {
        if (nav.canGoBack()){
          nav.pop();
        } 
        else {
          this.showConfirm(activeView.name);
        }
      }
      else {
        nav.pop();
      }
    });
  }

  showConfirm(rootPage: string) {
    const confirm = this.alertCtrl.create({
      title: 'Atencion!',
      message: 'Cerrar la aplicación?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.nav.setRoot(rootPage);
          console.log('Cancelar');
        }
      },{
        text: 'Aceptar',
        handler: () => {
          this.platform.exitApp();
        }
      }]
    });
    confirm.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
