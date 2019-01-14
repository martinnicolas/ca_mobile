import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { FormReclamoPage } from '../form-reclamo/form-reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { User } from '../../models/User';

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
  reclamo: Reclamo;
  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
      this.selectedItem = this.navParams.get('item');
      this.localStorage.getData('auth_data').then((auth_data) => {
        this.user = auth_data.user;
      });
  }

  openMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones sobre este reclamo',
      buttons: [
        {
          text: 'Me gusta',
          icon: 'thumbs-up',
          handler: () => {
            console.log('click Me gusta');
            this.localStorage.getData('auth_data').then((auth_data) => {
              this.apiService.valorarReclamo(this.selectedItem, auth_data.user, auth_data.auth_token).
              subscribe(data => {
                //Agregar messages
              });
            });
          }
        },{
          text: 'Editar',
          icon: 'create',
          handler: () => {
            console.log('click Editar');
            this.navCtrl.push(FormReclamoPage, {
              item: this.selectedItem
            });
          }
        },{
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('click Eliminar');
            this.showConfirm(this.selectedItem);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('click Cancelar');
          }
        }
      ]
    });
    actionSheet.present();
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
      });
    });
  }

  mostrarMapa() {
    console.log("Mostrar mapa");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerReclamoPage');
  }

}
