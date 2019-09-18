import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TipoReclamo } from '../../models/TipoReclamo';
import { ApiRestV1Provider } from '../../providers/api-rest-v1/api-rest-v1';
import { Reclamo } from '../../models/Reclamo';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
  toast: any;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiService: ApiRestV1Provider,
    private localStorage: LocalStorageProvider,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public toastCtrl: ToastController) {
    this.selectedItem = this.navParams.get('item');
    if (this.selectedItem) {
      this.reclamo = Object.assign({}, this.selectedItem);
    } else {
      this.reclamo = new Reclamo();
    }
    this.getTiposReclamo();
  }

  getTiposReclamo(): void {
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.createLoading();
      this.loader.present();
      this.apiService.getTiposReclamo(auth_data.auth_token).subscribe(data => {
        this.tipos_reclamo = data;
        this.loader.dismiss();
      });
    });
  }

  createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Espere por favor...",
    });
  }

  guardar(): void {
    if (!this.reclamo.id) {
      this.nuevoReclamo();
    } else {
      this.modificarReclamo();
    }
  }

  nuevoReclamo() {
    this.leerArchivo();
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.createReclamo(this.reclamo, auth_data.auth_token).subscribe(data => {
        this.reclamo = data;
        this.navCtrl.pop();
      });
    });
  }

  modificarReclamo() {
    this.leerArchivo();
    this.localStorage.getData('auth_data').then((auth_data) => {
      this.apiService.updateReclamo(this.reclamo, auth_data.auth_token).subscribe(data => {
        this.reclamo = data;
        this.navCtrl.pop();
      });
    });
  }

  leerArchivo() {
    
  }

  initMap() {
    if (this.selectedItem) {
      this.getReclamoLocationMap();
    } else {
      this.getCurrentLocationMap();
    }
  }

  getReclamoLocationMap() {
    const coords = new google.maps.LatLng(this.selectedItem.ubicacion.latitud, this.selectedItem.ubicacion.longitud);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      position: coords
    });
    // add a click event handler to the map object
    google.maps.event.addListener(this.map, "click", (event) => {
      // place a marker
      this.placeMarker(event.latLng);
      this.reclamo.ubicacion.latitud = event.latLng.lat();
      this.reclamo.ubicacion.longitud = event.latLng.lng();
    });
    //listener for marker dragging
    marker.addListener('drag', (event) => {
      this.reclamo.ubicacion.latitud = event.latLng.lat();
      this.reclamo.ubicacion.longitud = event.latLng.lng();
    });
  }

  getCurrentLocationMap() {
    //Obtengo ubicacion del usuario
    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions: google.maps.MapOptions = {
        center: coords,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // add a click event handler to the map object
      google.maps.event.addListener(this.map, "click", (event) => {
        // place a marker
        this.placeMarker(event.latLng);
        this.reclamo.ubicacion.latitud = event.latLng.lat();
        this.reclamo.ubicacion.longitud = event.latLng.lng();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
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
    //listener for marker dragging
    marker.addListener('drag', (event) => {
      this.reclamo.ubicacion.latitud = event.latLng.lat();
      this.reclamo.ubicacion.longitud = event.latLng.lng();
    });
  }

  deleteOverlays() {
    if (this.markersArray) {
      this.markersArray.forEach(element => {
        element.setMap(null);
      });
      this.markersArray.length = 0;
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.reclamo.imagen_uri = imageData;
    }, (err) => {
      // Handle error
      this.createToast();
      this.toast.setMessage("No se ha seleccionado ninguna imagen");
      this.toast.present();
    });
  }

  selectPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.reclamo.imagen_uri = imageData;
    }, (err) => {
      // Handle error
      this.createToast();
      this.toast.setMessage("No se ha seleccionado ninguna imagen");
      this.toast.present();
    });
  }

  createToast() {
    this.toast = this.toastCtrl.create({
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad FormReclamoPage');
  }

}
