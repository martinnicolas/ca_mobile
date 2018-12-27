import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  signin() {
    this.navCtrl.push(MainPage);
    console.log("Ingresar");
  }

  signup() {
    this.navCtrl.push(SignUpPage);
    console.log("Registrarse");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
