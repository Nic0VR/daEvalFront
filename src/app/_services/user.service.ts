import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { LoginResponse } from '../_models/loginResponse';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({providedIn: 'root'}) //@Service , ce service va pouvoir être injecté dans les différents composants
export class UserService{


  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private httpClient:HttpClient){

  }


  getAll(page:number, size:number, search:string){

    return this.httpClient.get<User[]>(`${environment.apiUrl}/api/utilisateur/page/${page}/${size}/${search}`);
  }

  findById(id:number){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/utilisateur/${id}`)
               .pipe(map(userFound => {return userFound;}));
  }

  countUsers(search:string){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/utilisateur/count/${search}`);
  }

  delete(id:number){
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/utilisateur/${id}`);
  }

  save(user:User){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/utilisateur`, user, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }

  update(user:User){
    return this.httpClient.put<any>(`${environment.apiUrl}/api/utilisateur`, user, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }
  
}
