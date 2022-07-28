import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlocCompetence } from '../_models/bloc-competence';
import { Competence } from '../_models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/competences"
  constructor(private httpClient: HttpClient) {

  }


  getAll() {
    return this.httpClient.get<BlocCompetence[]>(`${environment.apiUrl}`);
  }

  findById(id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/${id}`)
      .pipe(map(userFound => { return userFound; }));
  }


  save(entity: Competence) {
    return this.httpClient.post(this.baseUrl, entity, this.httpHeaders)
      .pipe(map(savedEntity => { return savedEntity }));
  }

  update(entity: Competence) {
    return this.httpClient.put(this.baseUrl, entity, this.httpHeaders)
      .pipe(map(savedEntity => { return savedEntity }));
  }

  findByBlocCompId(id:number){
    return this.httpClient.get<Competence[]>(`${this.baseUrl}/blocCompId=${id}`);
  }

  findAllByTitreOrDescription(search:string){
    return this.httpClient.get<Competence[]>(`${this.baseUrl}/search=${search}`);
  }


  findByTitreProId(id:number){
    return this.httpClient.get<Competence[]>(`${this.baseUrl}/titreProId=${id}`);
  }

  delete(id:number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
