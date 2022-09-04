import { Component, OnInit } from '@angular/core';
import { TitreProfessionnel } from './_models/titre-professionnel';
import { Ville } from './_models/ville';
import { FormationService } from './_services/formation.service';
import { TitreProfessionnelService } from './_services/titre-professionnel.service';
import { UserService } from './_services/user.service';
import { VilleService } from './_services/ville.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eval';

  villes?: Ville[];
  titreProsCount?: number;
  formationsCount?: number;
  userCount?:number;
  constructor(
    private villeService: VilleService,
    private titreProService: TitreProfessionnelService,
    private formationService: FormationService,
    private userService:UserService,
  ) {

  }

  ngOnInit(): void {
    this.loadVille();
    this.loadtitrePro();
    this.loadFormations();
    this.loadUser();
  }

  loadVille() {
    this.villeService.getAll().subscribe({
      next: (v) => {
        this.villes = v;
      },
      error: (e) => { console.log(e); }
    })
  }

  loadtitrePro() {
    this.titreProService.countTitreProfessionnels("").subscribe({
      next: (v) => {
        this.titreProsCount = v.nb;
      }
    })
  }

  loadFormations() {
    this.formationService.count("").subscribe({
      next: (v) => { this.formationsCount = v.nb; 
      },
      error: (e) => { console.log(e); }
    })
  }

  loadUser(){
    this.userService.countUsers("").subscribe({
      next:(v)=>{this.userCount=v.nb},
      error:(e)=>{console.log(e);}
    })
  }

  

}
