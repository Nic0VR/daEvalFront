import { Component, OnInit } from '@angular/core';
import { Niveau } from './_models/niveau';
import { TitreProfessionnel } from './_models/titre-professionnel';
import { Ville } from './_models/ville';
import { EtudiantService } from './_services/etudiant.service';
import { FormationService } from './_services/formation.service';
import { InterventionService } from './_services/intervention.service';
import { NiveauService } from './_services/niveau.service';
import { PromotionService } from './_services/promotion.service';
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
  niveaux?:Niveau[];
  etudiantCount?:number;
  interventionCount?:number;
  promoCount?:number;
  constructor(
    private villeService: VilleService,
    private titreProService: TitreProfessionnelService,
    private formationService: FormationService,
    private userService:UserService,
    private niveauService:NiveauService,
    private etudiantService:EtudiantService,
    private interventionService:InterventionService,
    private promoService:PromotionService,
  ) {

  }

  ngOnInit(): void {
    this.loadVille();
    this.loadtitrePro();
    this.loadFormations();
    this.loadUser();
    this.loadNiveaux();
    this.loadEtudiant();
    this.loadInter();
    this.loadPromo();
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

  loadNiveaux(){
    this.niveauService.findAll().subscribe({
      next:(v)=>{
        this.niveaux=v;
      },
      error:(e)=>{}
    })
  }

  loadEtudiant(){
    this.etudiantService.countStudents("").subscribe({
      next:(v)=>{this.etudiantCount=v.nb; },
      error:(e)=>{console.log(e);}
    })
  }

  loadInter(){
    this.interventionService.count("").subscribe({
      next:(v)=>{this.interventionCount=v.nb},
      error:(e)=>{console.log(e);}
    })
  }

  loadPromo(){
    this.promoService.countPromotion("").subscribe({
      next:(v)=>{this.promoCount=v.nb},
      error:(e)=>{console.log(e);}
    })
  }
}
