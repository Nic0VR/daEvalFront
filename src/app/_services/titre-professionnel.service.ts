import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TitreProfessionnel } from '../_models/titre-professionnel';
import { Ville } from '../_models/ville';

@Injectable(
  { providedIn: 'root' }
)
export class TitreProfessionnelService {

  private ListeTitreProSubject: BehaviorSubject<TitreProfessionnel[]>;

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private httpClient: HttpClient) {
    this.ListeTitreProSubject = new BehaviorSubject<TitreProfessionnel[]>([]);
    let tp: TitreProfessionnel[];
    this.getAll().subscribe({
      next: (v) => {
        tp = v; this.ListeTitreProSubject.next(tp); console.log("TP SERVICE INITIALISE");
      }
    });

  }

  public get TitrePros(): TitreProfessionnel[] {
    return this.ListeTitreProSubject.value;
  }
  getAllPage(page: number, size: number, search: string) {
    console.log(environment.apiUrl);

    return this.httpClient.get<TitreProfessionnel[]>(`${environment.apiUrl}/api/titrePro/page/${page}/${size}/${search}`);
  }
  getAll() {
    return this.httpClient.get<TitreProfessionnel[]>(`${environment.apiUrl}/api/titrePro`);
  }

  findById(id: number) {
    return this.httpClient.get<TitreProfessionnel>(`${environment.apiUrl}/api/titrePro/${id}`)
      .pipe(map(TitreProfessionnelFound => { return TitreProfessionnelFound; }));
  }

  countTitreProfessionnels(search: string) {

    return this.httpClient.get<any>(`${environment.apiUrl}/api/titrePro/count/${search}`);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/titrePro/${id}`);
  }

  save(TitreProfessionnel: TitreProfessionnel) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/titrePro`, TitreProfessionnel, this.httpHeaders)
      .pipe(map(savedTitreProfessionnel => { return savedTitreProfessionnel }));
  }

  update(TitreProfessionnel: TitreProfessionnel) {
    return this.httpClient.put<any>(`${environment.apiUrl}/api/titrePro`, TitreProfessionnel, this.httpHeaders)
      .pipe(map(savedTitreProfessionnel => { return savedTitreProfessionnel }));
  }
}
