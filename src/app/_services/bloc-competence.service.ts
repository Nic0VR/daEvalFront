import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlocCompetence } from '../_models/bloc-competence';

@Injectable({
  providedIn: 'root'
})
export class BlocCompetenceService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/blocComp"
  constructor(private httpClient: HttpClient) {

  }


  getAllPage(page: number, size: number, search: string) {

    return this.httpClient.get<BlocCompetence[]>(`${this.baseUrl}/page/${page}/${size}/${search}`);
  }
  getAll() {
    return this.httpClient.get<BlocCompetence[]>(`${this.baseUrl}`);
  }

  findById(id: number) {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
      .pipe(map(userFound => { return userFound; }));
  }

  count(search: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/count/${search}`);
  }

  save(entity: BlocCompetence) {
    return this.httpClient.post(this.baseUrl, entity, this.httpHeaders)
      .pipe(map(savedUser => { return savedUser }));
  }

  update(entity: BlocCompetence) {
    return this.httpClient.put(this.baseUrl, entity, this.httpHeaders)
      .pipe(map(savedUser => { return savedUser }));
  }

  findByTitreProId(id:number){
    return this.httpClient.get<BlocCompetence[]>(`${this.baseUrl}/tpId=${id}`);
  }

  findAllByTitreOrDescription(search:string){
    return this.httpClient.get<BlocCompetence[]>(`${this.baseUrl}/search=${search}`);
  }


  delete(id:number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

}
