import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
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
  private ListeNiveauxSubject: BehaviorSubject<Niveau[]>;
  constructor(
    private httpClient: HttpClient,

  ) {
    this.ListeNiveauxSubject = new BehaviorSubject<Niveau[]>([]);
    let n: Niveau[];
    this.findAll().subscribe({
      next: (v) => {
        n = v; this.ListeNiveauxSubject.next(n); console.log("niveau SERVICE INITIALISE");
      }
    });
  }

  public get Niveaux(): Niveau[] {
    return this.ListeNiveauxSubject.value;
  }


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
