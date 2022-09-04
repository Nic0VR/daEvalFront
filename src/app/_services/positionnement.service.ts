import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Positionnement } from '../_models/positionnement';

@Injectable({
  providedIn: 'root'
})
export class PositionnementService {


  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/positionnement"

  constructor(
    private httpClient: HttpClient,

  ) { }


  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(positionnement: Positionnement) {
    return this.httpClient.post<any>(`${this.baseUrl}`, positionnement, this.httpHeaders)
      .pipe(map(savedPositionnement => { return savedPositionnement }));
  }

  update(positionnement: Positionnement) {
    return this.httpClient.put<any>(`${this.baseUrl}`, positionnement, this.httpHeaders)
      .pipe(map(savedPositionnement => { return savedPositionnement }));
  }

  getById(id: number) {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((positionnementFound: Positionnement) => { return positionnementFound; }));
  }

  findAll() {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  findAllPage(page: number, size: number, search: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/page/${page}/${size}/${search}`)
  }

  count(search: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/count/${search}`);
  }

  findAllByInterventionId(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}/ByInterv=${id}`);
  }
}
