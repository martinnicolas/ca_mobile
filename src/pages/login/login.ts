import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { User } from '../../models/User';
import { SignUpPage } from '../sign-up/sign-up';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AuthData } from '../../models/AuthData';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  loader: any;
  loginForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.auth_data = new AuthData();
      this.user = new User();
      this.setFormValidations()
  }

  setFormValidations() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(User.EMAIL_PATTERN)])),
      password: new FormControl('', Validators.required),
    });
  }

  signin() {
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;
    this.createLoading();
    this.loader.present();
    this.apiService.signin(this.user).subscribe(data => {
      this.loader.dismiss();
      this.auth_data = data;
      this.localStorage.setData('auth_data', this.auth_data);
      this.navCtrl.push(MainPage);
    }, errorData => {
      //messages error
      this.loader.dismiss();
      this.createToast();
      this.toast.setMessage(errorData.error);
      this.toast.present();
    });
  }

  createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Iniciando sesion...",
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

}
