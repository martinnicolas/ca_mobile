import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { User } from '../../models/User';
import { SignUpPage } from '../sign-up/sign-up';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

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

  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
      this.user = new User();
  }

  signin() {
    this.apiService.login(this.user)
    .subscribe(data => {
      this.user = data;
      this.localStorage.setData('email', this.user.email);
      this.localStorage.setData('authentication_token', this.user.authentication_token);
      this.navCtrl.push(MainPage);
      console.log("Login");
    });
  }

  signup() {
    this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
