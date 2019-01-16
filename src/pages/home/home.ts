import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { VerReclamoPage } from '../ver-reclamo/ver-reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  reclamos: Reclamo[];
  loader: any;
  toast: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.getReclamos();
  }

  getReclamos(): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.createLoading();
      this.loader.present();
      this.apiService.getReclamos(auth_data.auth_token).subscribe(data => {
        this.reclamos = data;
        this.loader.dismiss();
      });
    });
  }

  verReclamo(event, item) {
    this.navCtrl.push(VerReclamoPage, {
      item: item
    });
  }

  valorarReclamo(event, item) {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.createToast();
      this.apiService.valorarReclamo(item, auth_data.user, auth_data.auth_token).
      subscribe(data => {
        //messages ok    
        this.toast.setMessage('Apoyaste este reclamo!');
        this.toast.present();
      }, error => {
        //messages error
        this.toast.setMessage('Ocurrio un error.');
        this.toast.present();
      });
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

  createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor espere...",
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
