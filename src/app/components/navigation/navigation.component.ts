import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/_models/loginResponse';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUsername : string;
  currentUser: LoginResponse;
  constructor(private authenticationService: AuthenticationService, private router:Router) {
    this.currentUsername = authenticationService.currentUserValue.nom;
    this.currentUser = authenticationService.currentUserValue;
   }

  ngOnInit(): void {
    
  }

  deco():void{
    this.authenticationService.logout();
    this.router.navigateByUrl("");
  }

  debug(){

    console.log(this.authenticationService.currentUserValue);
    
  }
}
