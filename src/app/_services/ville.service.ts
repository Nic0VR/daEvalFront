import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../_models/ville';

@Injectable(
  { providedIn: 'root'}
  )
export class VilleService {
  private ListeVilleSubject:BehaviorSubject<Ville[]>;
  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.ListeVilleSubject= new BehaviorSubject<Ville[]>([])
    let vil:Ville[] ;
    this.getAll().subscribe({next:(v)=> {vil=v; this.ListeVilleSubject.next(vil);console.log("VILLE SERVICE INITIALISE");
    } })

   }

  public get Villes():Ville[]{
    return this.ListeVilleSubject.value;
  }

  getAll(){
    return this.httpClient.get<Ville[]>(`${environment.apiUrl}/api/ville`);
  }

  getById(id:number){
    return this.httpClient.get<Ville>(`${environment.apiUrl}/api/ville/${id}`);
  }
}
