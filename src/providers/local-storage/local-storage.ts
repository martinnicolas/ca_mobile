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

  async getData(key: string) {
    return await this.storage.get(key);
  }

  setData(key: string, value: any) {
    this.storage.set(key, value);
  }

  removeData(key: string){
    this.storage.remove(key);
  }

}
