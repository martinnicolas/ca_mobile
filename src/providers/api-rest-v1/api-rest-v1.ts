import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../BaseProvider';
import { Reclamo } from '../../models/Reclamo';
import { TipoReclamo } from '../../models/TipoReclamo';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ApiRestV1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRestV1Provider extends BaseProvider{

  //Nombre de la API REST
  private apiName = 'api_restv1'

  private reclamosResource = `${this.baseURL}/${this.apiName}`;

  constructor(public http: HttpClient) {
    super();
  }

  getReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(`${this.reclamosResource}/check_reclamos`);
  }

  getTiposReclamo(): Observable<TipoReclamo[]> {
    return this.http.get<TipoReclamo[]>(`${this.reclamosResource}/check_tipos_reclamo`);
  }

  createReclamo(reclamo: Reclamo): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('tipo_reclamo_id', reclamo.tipo_reclamo_id.toString());
    params.set('titulo', reclamo.titulo.toString());
    params.set('descripcion', reclamo.descripcion.toString());
    return this.http.post<Reclamo>(`${this.reclamosResource}/check_reclamos`, params.toString(), options);
  }

  updateReclamo(reclamo: Reclamo): Observable<Reclamo> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new URLSearchParams();
    params.set('tipo_reclamo_id', reclamo.tipo_reclamo_id.toString());
    params.set('titulo', reclamo.titulo.toString());
    params.set('descripcion', reclamo.descripcion.toString());
    return this.http.put<Reclamo>(`${this.reclamosResource}/check_reclamos/${reclamo.id}`, params.toString(), options);
  }

  deleteReclamo(reclamo: Reclamo): Observable<Reclamo> {
    return this.http.delete<Reclamo>(`${this.reclamosResource}/check_reclamos/${reclamo.id}`);
  }

}
