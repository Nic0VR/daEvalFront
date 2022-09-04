import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // const isLogged : boolean= this.authenticationService.currentUserValue.id != 0;

    // const role=this.authenticationService.currentUserValue.typeUser;

  }

}
