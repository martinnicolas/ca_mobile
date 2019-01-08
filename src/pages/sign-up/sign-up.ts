import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { User } from '../../models/User';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AuthData } from '../../models/AuthData';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  auth_data: AuthData;
  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
    this.user = new User();
  }

  signup() {
    this.apiService.signup(this.user)
    .subscribe(data => {
      this.auth_data = data;
      this.localStorage.setData('authentication_token', this.auth_data.auth_token);
      this.navCtrl.push(MainPage);
      console.log("Login");
    });      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
