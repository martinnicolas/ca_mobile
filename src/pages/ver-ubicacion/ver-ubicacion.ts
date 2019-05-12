import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerUbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-ubicacion',
  templateUrl: 'ver-ubicacion.html',
})
export class VerUbicacionPage {

  @ViewChild("map") mapElement;
  map: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = this.navParams.get('item');
  }

  initMap() {
    let coords = new google.maps.LatLng(this.selectedItem.ubicacion.latitud, this.selectedItem.ubicacion.longitud);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    new google.maps.Marker({
      map: this.map,
      position: coords
    });
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad VerUbicacionPage');
  }

}
