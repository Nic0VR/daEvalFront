import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../_models/etudiant';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
 

  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private httpClient:HttpClient){

  }


  getAllPage(page:number, size:number, search:string){

    return this.httpClient.get<Etudiant[]>(`${environment.apiUrl}/api/etudiant/page/${page}/${size}/${search}`);
  }
  getAll() {
    return this.httpClient.get<Etudiant[]>(`${environment.apiUrl}/api/etudiant/`);
  }
  
  findById(id:number){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/etudiant/${id}`)
               .pipe(map(userFound => {return userFound;}));
  }

  countStudents(search:string){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/etudiant/count/${search}`);
  }

  delete(id:number){
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/etudiant/${id}`);
  }

  save(etudiant:Etudiant){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/etudiant`, etudiant, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }

  update(etudiant:Etudiant){
    return this.httpClient.put<any>(`${environment.apiUrl}/api/etudiant`, etudiant, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }

}
