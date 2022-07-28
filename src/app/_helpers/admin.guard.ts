import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router:Router,
    private authService:AuthenticationService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const cUser = this.authService.currentUserValue;
    
    if(cUser.typeUser == "ADMINISTRATEUR") {//si connecté (localstorage currentStorage => return true)
      return true;
    }

    //sinon redirection vers la page de /login avec un paramètre returnUrl=state.url return false
    // this.router.navigate(['/login'], { queryParams : { returnUrl: state.url}});
    this.router.navigate(['/main/forbidden'])
    return false;
  }
  
}
