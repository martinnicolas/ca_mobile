import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevoReclamoPage } from '../nuevo-reclamo/nuevo-reclamo';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';

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
    public apiService: ApiRestV1Provider) {
      this.getReclamos();
  }

  getReclamos(): void {
    this.cargando_reclamos = true;
    this.apiService.getReclamos().subscribe(data => {
      this.reclamos = data;
      this.cargando_reclamos = false;
    });
  }

  nuevoReclamo() {
    this.navCtrl.push(NuevoReclamoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReclamosPage');
  }

}
