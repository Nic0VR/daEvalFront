import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Formation } from '../_models/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/formation"
  private ListeFormationSubject: BehaviorSubject<Formation[]>;

  constructor(
    private httpClient: HttpClient,

  ) {
    this.ListeFormationSubject = new BehaviorSubject<Formation[]>([]);
    let f: Formation[];
    this.findAll().subscribe({
      next: (v) => {
        f = v; this.ListeFormationSubject.next(f); console.log("Formation SERVICE INITIALISE");
      }
    });
  }

  public get Formations():Formation[]{
    return this.ListeFormationSubject.value;
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(formation: Formation) {
    return this.httpClient.post<any>(`${this.baseUrl}`, formation, this.httpHeaders)
      .pipe(map(savedFormation => { return savedFormation }));
  }

  update(formation: Formation) {
    return this.httpClient.put<any>(`${this.baseUrl}`, formation, this.httpHeaders)
      .pipe(map(savedFormation => { return savedFormation }));
  }

  getById(id: number) {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((formationFound: Formation) => { return formationFound; }));
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

}
