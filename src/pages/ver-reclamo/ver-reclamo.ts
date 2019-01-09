import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { FormReclamoPage } from '../form-reclamo/form-reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
      this.selectedItem = this.navParams.get('item');
  }

  openMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones sobre este reclamo',
      buttons: [
        {
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
      message: 'Desea eliminar esta persona?',
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
    this.localStorage.getData('auth_token').then((token) => {
      this.apiService.deleteReclamo(reclamo, token).
      subscribe(data => {
        this.navCtrl.pop();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerReclamoPage');
  }

}
