import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Epreuve } from '../_models/epreuve';

@Injectable({
  providedIn: 'root'
})
export class EpreuveService {

  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/epreuve"


  constructor(private httpClient:HttpClient) { }

  delete(id:number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(epreuve:Epreuve){
    return this.httpClient.post<any>(`${this.baseUrl}`, epreuve, this.httpHeaders)
              .pipe(map(savedEpreuve => {return savedEpreuve}));
  }

  update(epreuve:Epreuve){
    return this.httpClient.put<any>(`${this.baseUrl}`, epreuve, this.httpHeaders)
              .pipe(map(savedEpreuve => {return savedEpreuve}));
  }

  getById(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
               .pipe(map((epreuveFound: any) => {return epreuveFound;}));
  }

  getByBlocCompId(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}/blocCompId=${id}`);
  }

  findAll(){
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

}
