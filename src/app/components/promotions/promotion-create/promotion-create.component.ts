import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Promotion } from 'src/app/_models/promotion';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { Ville } from 'src/app/_models/ville';
import { PromotionService } from 'src/app/_services/promotion.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { VilleService } from 'src/app/_services/ville.service';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {

  titrePros?:TitreProfessionnel[];
  villes?:Ville[];
  searchExpression: string="";
  itemsPerPage: number=10;
  currentPage: number=1;
  totalItems: number=0;
  @Output() 
  annulerCreationEvent=new EventEmitter();

  ajouterPromoFormulaire:FormGroup=new FormGroup({
    dateDebut:new FormControl("",Validators.required),
    dateFin:new FormControl("",Validators.required),
    titrePro:new FormControl("",Validators.required),
    ville:new FormControl("",Validators.required),
  })
  constructor(private titreProService: TitreProfessionnelService,
    private villeService:VilleService,
    private promotionService: PromotionService,
  ) { }

  ngOnInit(): void {
    this.chargerTitrePros();
    this.chargerVille();
  }

  chargerTitrePros(){
    this.titreProService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).subscribe({next:(v)=>{this.titrePros=v}})
  }

  chargerVille(){
    this.villeService.getAll().subscribe({
      next:(v)=>{this.villes=v},
      error:(e)=>{console.log(e);},
    })
  }

  creerPromo(){
    let p :Promotion=new Promotion();
    p.dateDebut= this.ajouterPromoFormulaire.get('dateDebut')?.value;
    p.dateFin= this.ajouterPromoFormulaire.get('dateFin')?.value;
    p.villeId= this.ajouterPromoFormulaire.get('ville')?.value;
    p.titreProfessionnelId= this.ajouterPromoFormulaire.get('titrePro')?.value;
    this.promotionService.save(p).subscribe({
      next:(v)=>{console.log("sauvegarde effectuée");},
      error:(e)=>{console.log(e);},
      complete:()=>{window.location.reload()}
    })
  }

  annulerCreation(){
    this.annulerCreationEvent.emit();
  }

  
  rechercher() {
    this.chargerTitrePros();
  }

  annulerRechercher() {
    this.searchExpression = "";
    this.chargerTitrePros();
  }
}
