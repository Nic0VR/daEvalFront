import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Niveau } from '../_models/niveau';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/niveau"

  constructor(
    private httpClient: HttpClient,

  ) { }


  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(niveau: Niveau) {
    return this.httpClient.post<any>(`${this.baseUrl}`, niveau, this.httpHeaders)
      .pipe(map(savedNiveau => { return savedNiveau }));
  }

  update(niveau: Niveau) {
    return this.httpClient.put<any>(`${this.baseUrl}`, niveau, this.httpHeaders)
      .pipe(map(savedNiveau => { return savedNiveau }));
  }

  findAll() {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }


}
