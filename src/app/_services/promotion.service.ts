import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Promotion } from '../_models/promotion';
import { BehaviorSubject, map } from 'rxjs';
import { Etudiant } from '../_models/etudiant';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  

  promotions?:Promotion[];
  private ListePromoSubject: BehaviorSubject<Promotion[]>;


  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private httpClient:HttpClient) { 
    this.ListePromoSubject = new BehaviorSubject<Promotion[]>([]);
    let i: Promotion[];

    this.getAll().subscribe({
      next: (v) => {
        i = v; this.ListePromoSubject.next(i); console.log("promo SERVICE INITIALISE");
      }
    });
  }


  public get Promotions(){
    return this.ListePromoSubject.value;
  }

  getAllPage(page:number, size:number, search:string){

    return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/api/promotion/page/${page}/${size}/${search}`);
  }
  getAll(){
    return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/api/promotion/`);
  }
  findById(id:number){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/promotion/${id}`)
               .pipe(map((promoFound: any) => {return promoFound;}));
  }

  countPromotion(search:string){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/promotion/count/${search}`);
  }

  delete(id:number){
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/promotion/${id}`);
  }

  save(promotion:Promotion){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/promotion`, promotion, this.httpHeaders)
              .pipe(map(savedPromo => {return savedPromo}));
  }


  update(promotion:Promotion){
    return this.httpClient.put<any>(`${environment.apiUrl}/api/promotion`, promotion, this.httpHeaders)
              .pipe(map(savedPromo => {return savedPromo}));
  }

  getAllEtudiantsFromPromo(id:number){
    return this.httpClient.get<Etudiant[]>(`${environment.apiUrl}/api/promotion/id=${id}/etudiants`)
  }

  getAllPromosContainingEtudiant(id:number){
    return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/api/promotion/ctn/${id}`)
  }
}
