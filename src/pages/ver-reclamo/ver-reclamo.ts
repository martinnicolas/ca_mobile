import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { FormReclamoPage } from '../form-reclamo/form-reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { User } from '../../models/User';
import { VerUbicacionPage } from '../ver-ubicacion/ver-ubicacion';

/**
 * Generated class for the VerReclamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-reclamo',
  templateUrl: 'ver-reclamo.html',
})
export class VerReclamoPage {

  selectedItem: any;
  toast: any;
  reclamo: Reclamo;
  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    public toastCtrl: ToastController) {
      this.selectedItem = this.navParams.get('item');
      this.localStorage.getData('auth_data').then((auth_data) => {
        this.user = auth_data.user;
      });
  }

  valorar() {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.createToast();
      this.apiService.valorarReclamo(this.selectedItem, this.user, auth_data.auth_token).
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

  editar() {
    this.navCtrl.push(FormReclamoPage, {
      item: this.selectedItem
    });    
  }

  eliminar() {
    this.showConfirm(this.selectedItem);
  }

  showConfirm(reclamo: Reclamo) {
    const confirm = this.alertCtrl.create({
      title: 'Atención',
      message: 'Quiere eliminar este reclamo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('click Cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('click Aceptar');
            this.eliminarReclamo(reclamo);
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarReclamo(reclamo: Reclamo): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.deleteReclamo(reclamo, auth_data.auth_token).
      subscribe(data => {
        this.navCtrl.pop();
      }, error => {
        this.createToast();
        this.toast.dismiss();
      });
    });
  }

  verUbicacion() {
    this.navCtrl.push(VerUbicacionPage, {
      item: this.selectedItem
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerReclamoPage');
  }

}
