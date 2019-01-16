import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { User } from '../../models/User';
import { SignUpPage } from '../sign-up/sign-up';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AuthData } from '../../models/AuthData';

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

  auth_data: AuthData;
  user: User;
  toast: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    public toastCtrl: ToastController) {
      this.auth_data = new AuthData();
      this.user = new User();
  }

  signin() {
    this.apiService.signin(this.user)
    .subscribe(data => {
      this.auth_data = data;
      this.localStorage.setData('auth_data', this.auth_data);
      this.navCtrl.push(MainPage);
      console.log("Login");
    }, error => {
      //messages error
      this.createToast();
      this.toast.setMessage('Usuario o clave incorrectas.');
      this.toast.present();
    });
  }

  createToast() {
    this.toast = this.toastCtrl.create({
      message: 'Ocurrion un error!',
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });
  }

  signup() {
    this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
