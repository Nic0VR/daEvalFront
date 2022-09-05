import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evaluation } from '../_models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  private baseUrl = environment.apiUrl + "/api/eval"

  constructor(private httpClient: HttpClient) { }


  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  save(evaluation: Evaluation) {
    return this.httpClient.post<any>(`${this.baseUrl}`, evaluation, this.httpHeaders)
      .pipe(map(savedEval => { return savedEval }));
  }

  update(evaluation: Evaluation) {
    return this.httpClient.put<any>(`${this.baseUrl}`, evaluation, this.httpHeaders)
      .pipe(map(savedEval => { return savedEval }));
  }

  getAll(){
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }


  getAllByEtudiantId(etudiantId:number) {
    return this.httpClient.get<any>(`${this.baseUrl}/etud/id=${etudiantId}`)
  }

  getAllByEtudiantIdAndBlocCompId(etudiantId:number,blocCompId:number) {
    return this.httpClient.get<any>(`${this.baseUrl}/etudiantId=${etudiantId}/blocId=${blocCompId}`)
   }
  
  getAllByEpreuveId(epreuveId:number){
    return this.httpClient.get<any>(`${this.baseUrl}/epreuveId=${epreuveId}`)
  }

  generateBulletinByPromo(promoId:number):Observable<Blob> {
 
    return this.httpClient.get(`${this.baseUrl}/bulletin-promotion/${promoId}`,{responseType:'blob'})

  }
  generateBulletinByStudentAndPromo(etudiantId:number,promoId:number) :Observable<Blob>{
    return this.httpClient.get(`${this.baseUrl}/bulletin-etudiant/${etudiantId}/${promoId}`,{responseType:'blob'})
  }

  getMoyenneEtudiantInBlocComp(etudiantId:number,blocCompId:number){
    return this.httpClient.get<any>(`avg/blocId=${blocCompId}/etudiantId=${etudiantId}`)

  }

  getMoyennePromoInBlocComp(promoId:number,blocCompId:number){
    return this.httpClient.get<any>(`/avg/promoId=${promoId}/blocId=${blocCompId}`)
  }

  getMoyenneEtudiantPromo(promoId:number,etudiantId:number){
    return this.httpClient.get<any>(`/avg/promoId=${promoId}/etudiantId=${etudiantId}`)

  }


}
