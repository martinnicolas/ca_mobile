import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TipoReclamo } from '../../models/TipoReclamo';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

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
  @ViewChild("map") mapElement;
  map: any;
  markersArray = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider) {
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

  getTiposReclamo(): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.getTiposReclamo(auth_data.auth_token).subscribe(data => {
        this.tipos_reclamo = data;
      });
    });
  }

  guardar(): void {
    if (!this.reclamo.id) {
      this.nuevoReclamo();
    }else {
      this.modificarReclamo();
    }    
  }

  nuevoReclamo() {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.createReclamo(this.reclamo, auth_data.auth_token).subscribe(data => {
        this.reclamo = data;
        this.navCtrl.pop();
      });      
    });
  }

  modificarReclamo() {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.updateReclamo(this.reclamo, auth_data.auth_token).subscribe(data => {
        this.reclamo = data;
        this.navCtrl.pop();
      });      
    });
  }

  initMap() {
    let coords;
    if (this.selectedItem) {
      coords = new google.maps.LatLng(this.selectedItem.ubicacion.latitud, this.selectedItem.ubicacion.longitud);      
    } else {
      //Obtengo ubicacion del usuario
      coords = new google.maps.LatLng(-43.296344, -65.091966);
    }
    
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    if (this.selectedItem) {
      let marker: google.maps.Marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        position: coords
      });
    }

    // add a click event handler to the map object
    google.maps.event.addListener(this.map, "click", (event) => {
      // place a marker
      this.placeMarker(event.latLng);
    });
  }

  placeMarker(location) {
    // first remove all markers if there are any
    this.deleteOverlays();

    var marker = new google.maps.Marker({
      position: location,
      draggable: true,
      map: this.map
    });

    // add marker in markers array
    this.markersArray.push(marker);
  }

  deleteOverlays() {
    if (this.markersArray) {
      this.markersArray.forEach(element => {
        element.setMap(null);
      });
      this.markersArray.length = 0;
    }
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad FormReclamoPage');
  }

}
