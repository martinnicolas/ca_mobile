import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';

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
  cargando_reclamos: boolean;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
