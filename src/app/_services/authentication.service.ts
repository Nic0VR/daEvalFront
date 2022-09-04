import { LoginResponse } from './../_models/loginResponse';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<LoginResponse>;
  // private initialLoginResponse : LoginResponse = new LoginResponse();

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private httpClient: HttpClient) {
    let lsVal = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(lsVal!));
    // this.currentUserSubject = new BehaviorSubject<LoginResponse>(this.initialLoginResponse);
    this.currentUser = this.currentUserSubject.asObservable();
    // this.isLogged();
  }


  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(email: string, motDePasse: string) {
    return this.httpClient.post<any>('http://localhost:8080/login', { email, motDePasse }, this.httpHeaders)
      .pipe(map(result => {
        //stockage dans le "localStorage"
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject.next(result);
        return result;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);

  }


}
