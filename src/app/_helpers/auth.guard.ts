import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

/**
 * Authentification Interceptor
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const cUser = this.authService.currentUserValue;
    // this.authService.isLogged()
    if(cUser.id!=0) {//si connecté (localstorage currentStorage => return true)
      return true;
    }

    //sinon redirection vers la page de /login avec un paramètre returnUrl=state.url return false
    this.authService.logout();
    this.router.navigate(['/login'], { queryParams : { returnUrl: state.url}});
    return false;
  }

}
