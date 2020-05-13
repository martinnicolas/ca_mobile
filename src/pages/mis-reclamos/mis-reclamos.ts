import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { VerReclamoPage } from '../ver-reclamo/ver-reclamo';
import { FormReclamoPage } from '../form-reclamo/form-reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the MisReclamosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-reclamos',
  templateUrl: 'mis-reclamos.html',
})
export class MisReclamosPage {

  reclamos: Reclamo[];
  busqueda_reclamos: Reclamo[];
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    public loadingCtrl: LoadingController) {
  }

  getMisReclamos(): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.createLoading();
      this.loader.present();
      this.apiService.getReclamosUser(auth_data.auth_token).subscribe(data => {
        this.reclamos = data;
        this.busqueda_reclamos = data;
        this.loader.dismiss();
      });
    });
  }

  nuevoReclamo() {
    this.navCtrl.push(FormReclamoPage);
  }

  itemTapped(event, item) {
    this.navCtrl.push(VerReclamoPage, {
      item: item
    });
  }

  createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando reclamos...",
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.reclamos = this.busqueda_reclamos.filter((item) => {
        return (item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.reclamos = this.busqueda_reclamos;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReclamosPage');
  }

  ionViewWillEnter() {
    this.getMisReclamos();
  }

}
