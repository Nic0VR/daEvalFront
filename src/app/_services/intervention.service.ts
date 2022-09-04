import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Intervention } from '../_models/intervention';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  
  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/interv"

  constructor(
    private httpClient:HttpClient,

  ) { }


  delete(id:number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(intervention:Intervention){
    return this.httpClient.post<any>(`${this.baseUrl}`, intervention, this.httpHeaders)
              .pipe(map(savedIntervention => {return savedIntervention}));
  }

  update(intervention:Intervention){
    return this.httpClient.put<any>(`${this.baseUrl}`, intervention, this.httpHeaders)
              .pipe(map(savedIntervention => {return savedIntervention}));
  }

  getById(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
               .pipe(map((interventionFound: Intervention) => {return interventionFound;}));
  }

  findAll(){
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  findAllPage(page: number, size: number, search: string){
    return this.httpClient.get<any>(`${this.baseUrl}/page/${page}/${size}/${search}`)
  }

  count(search: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/count/${search}`);
  }

}
