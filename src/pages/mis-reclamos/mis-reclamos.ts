import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  cargando_reclamos: boolean;
  reclamos: Reclamo[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
      this.getMisReclamos();
  }

  getMisReclamos(): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.cargando_reclamos = true;
      this.apiService.getReclamosUser(auth_data.user, auth_data.auth_token).subscribe(data => {
        this.reclamos = data;
        this.cargando_reclamos = false;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReclamosPage');
  }

}
