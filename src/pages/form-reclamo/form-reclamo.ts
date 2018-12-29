import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TipoReclamo } from '../../models/TipoReclamo';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';

/**
 * Generated class for the FormReclamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-reclamo',
  templateUrl: 'form-reclamo.html',
})
export class FormReclamoPage {
  
  selectedItem: any;
  titulo: string;
  reclamo: Reclamo;
  tipos_reclamo: TipoReclamo[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider) {
    this.selectedItem = this.navParams.get('item');
    this.getTiposReclamo();
    if (this.selectedItem) {
      this.reclamo = this.selectedItem;
      this.titulo = 'Editar reclamo';
    } else {
      this.titulo = 'Nuevo reclamo';
      this.reclamo = new Reclamo();
      this.reclamo.tipo_reclamo = new TipoReclamo();
    }
  }

  getTiposReclamo() {
    this.apiService.getTiposReclamo()
      .subscribe(
        tipos_reclamo => this.tipos_reclamo = tipos_reclamo
      );
  }

  guardar(): void {
    if (!this.reclamo.id) {
      this.nuevoReclamo();
    }else {
      this.modificarReclamo();
    }    
  }

  nuevoReclamo() {
    this.apiService.createReclamo(this.reclamo)
    .subscribe(data => {
      this.reclamo = data;
      this.navCtrl.pop();
    });      
  }

  modificarReclamo() {
    this.apiService.updateReclamo(this.reclamo)
    .subscribe(data => {
      this.reclamo = data;
      this.navCtrl.pop();
    });      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormReclamoPage');
  }

}
