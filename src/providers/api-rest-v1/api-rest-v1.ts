import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from './BaseProvider';
import { Reclamo } from '../../models/Reclamo';
import { TipoReclamo } from '../../models/TipoReclamo';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User';
import { LocalStorageProvider } from '../local-storage/local-storage';

/*
  Generated class for the ApiRestV1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRestV1Provider extends BaseProvider{

  //Nombre de la API REST
  private apiName = 'api_restv1'

  private resource = `${this.baseURL}/${this.apiName}`;

  constructor(
    public http: HttpClient,
    private localStorage: LocalStorageProvider) {
    super();
  }

  login(user: User): Observable<User> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('email', user.email.toString());
    params.set('password', user.password.toString());
    return this.http.post<User>(`${this.resource}/signin`, params.toString(), options);
  }

  signup(user: User): Observable<User> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('email', user.email.toString());
    params.set('password', user.password.toString());
    params.set('confirm_password', user.confirm_password.toString());
    return this.http.post<User>(`${this.resource}/signup`, params.toString(), options);
  }

  getReclamos(): Observable<Reclamo[]> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.localStorage.getData('authentication_token').toString(),
        'email': this.localStorage.getData('email').toString(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get<Reclamo[]>(`${this.resource}/reclamos`, options);
  }

  getTiposReclamo(): Observable<TipoReclamo[]> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.localStorage.getData('authentication_token').toString(),
        'email': this.localStorage.getData('email').toString(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get<TipoReclamo[]>(`${this.resource}/tipos_reclamo`, options);
  }

  createReclamo(reclamo: Reclamo): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.localStorage.getData('authentication_token').toString(),
        'email': this.localStorage.getData('email').toString(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let params = new URLSearchParams();
    params.set('tipo_reclamo_id', reclamo.tipo_reclamo_id.toString());
    params.set('titulo', reclamo.titulo.toString());
    params.set('descripcion', reclamo.descripcion.toString());
    return this.http.post<Reclamo>(`${this.resource}/reclamos`, params.toString(), options);
  }

  updateReclamo(reclamo: Reclamo): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.localStorage.getData('authentication_token').toString(),
        'email': this.localStorage.getData('email').toString(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let params = new URLSearchParams();
    params.set('tipo_reclamo_id', reclamo.tipo_reclamo_id.toString());
    params.set('titulo', reclamo.titulo.toString());
    params.set('descripcion', reclamo.descripcion.toString());
    return this.http.put<Reclamo>(`${this.resource}/reclamos/${reclamo.id}`, params.toString(), options);
  }

  deleteReclamo(reclamo: Reclamo): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.localStorage.getData('authentication_token').toString(),
        'email': this.localStorage.getData('email').toString(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.delete<Reclamo>(`${this.resource}/reclamos/${reclamo.id}`, options);
  }

}
