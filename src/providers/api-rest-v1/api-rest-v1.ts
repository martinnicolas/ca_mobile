import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from './BaseProvider';
import { Reclamo } from '../../models/Reclamo';
import { TipoReclamo } from '../../models/TipoReclamo';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User';
import { AuthData } from '../../models/AuthData';

/*
  Generated class for the ApiRestV1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRestV1Provider extends BaseProvider{

  //Nombre de la API REST
  private apiName = 'api_restv1'

  //Resource
  private resource = `${this.baseURL}/${this.apiName}`;


  constructor(
    public http: HttpClient) {
    super();
  }

  signin(user: User): Observable<AuthData> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('email', user.email.toString());
    params.set('password', user.password.toString());
    return this.http.post<AuthData>(`${this.resource}/signin`, params.toString(), options);
  }

  signup(user: User): Observable<AuthData> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('email', user.email.toString());
    params.set('password', user.password.toString());
    params.set('confirm_password', user.confirm_password.toString());
    return this.http.post<AuthData>(`${this.resource}/signup`, params.toString(), options);
  }

  getReclamos(token: string): Observable<Reclamo[]> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get<Reclamo[]>(`${this.resource}/index`, options);
  }

  getReclamosUser(token: string): Observable<Reclamo[]> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get<Reclamo[]>(`${this.resource}/reclamos`, options);
  }

  getTiposReclamo(token: string): Observable<TipoReclamo[]> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get<TipoReclamo[]>(`${this.resource}/tipos_reclamo`, options);
  }

  createReclamo(reclamo: Reclamo, token: string): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'multipart/form-data'
      })
    };
    let formData = new FormData();
    formData.append('imagen', reclamo.imagen_blob, reclamo.imagen_file.name);
    formData.append('tipo_reclamo_id', reclamo.tipo_reclamo.id.toString());
    formData.append('titulo', reclamo.titulo.toString());
    formData.append('fecha', reclamo.fecha.toString());
    formData.append('descripcion', reclamo.descripcion.toString());
    formData.append('latitud', reclamo.ubicacion.latitud.toString());
    formData.append('longitud', reclamo.ubicacion.longitud.toString());
    return this.http.post<Reclamo>(`${this.resource}/reclamos`, formData, options);
  }

  updateReclamo(reclamo: Reclamo, token: string): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'multipart/form-data'
      })
    };
    let formData = new FormData();
    formData.append('imagen', reclamo.imagen_blob, reclamo.imagen_file.name);
    formData.append('tipo_reclamo_id', reclamo.tipo_reclamo.id.toString());
    formData.append('titulo', reclamo.titulo.toString());
    formData.append('fecha', reclamo.fecha.toString());
    formData.append('descripcion', reclamo.descripcion.toString());
    formData.append('latitud', reclamo.ubicacion.latitud.toString());
    formData.append('longitud', reclamo.ubicacion.longitud.toString());
    return this.http.put<Reclamo>(`${this.resource}/reclamos/${reclamo.id}`, formData, options);
  }

  deleteReclamo(reclamo: Reclamo, token: string): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.delete<Reclamo>(`${this.resource}/reclamos/${reclamo.id}`, options);
  }

  valorarReclamo(reclamo: Reclamo, user: User, token: string) {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let params = new URLSearchParams();
    params.set('reclamo_id', reclamo.id.toString());
    params.set('user_id', user.id.toString());
    return this.http.post<Reclamo>(`${this.resource}/reclamos/${reclamo.id}/valorar`, params.toString(), options);
  }

}
