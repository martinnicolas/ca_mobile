import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  value: any;

  constructor(
    public http: HttpClient,
    private storage: Storage ) {
      
  }

  getData(key: string) {

    this.storage.get(key).then((val) => {
      this.value = val;
    });
    return this.value;
  }

  setData(key: string, value: any) {
    this.storage.set(key, value);
  }

  removeData(key: string){
    this.storage.remove(key);
  }

}
