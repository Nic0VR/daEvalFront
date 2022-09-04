import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;
  error='';
  currentUser?:User
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  });

  }

  ngOnInit(): void {
    const isLogged = this.authenticationService.currentUserValue;
    console.log("is logged : ");
    console.log(isLogged);
    
    
    if(isLogged && isLogged.id!=0){
      this.router.navigateByUrl("/main")
    }
  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // this.authenticationService.isLogged();
    // console.log(this.f['email'].value);
    // console.log(this.f['password'].value);

    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: ()=>{
          //il y a une url demandée dans les paramètres de route, prendre celle-ci sinon on redirige vers admin
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main/';
          this.router.navigate([returnUrl]);
        },
        error: error=> {
          this.error="Erreur d'authentification : " + error.message;
        }
      });

      // this.authenticationService.isLogged();


  }

}
