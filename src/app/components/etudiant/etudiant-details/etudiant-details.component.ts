import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { Promotion } from 'src/app/_models/promotion';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';
import { PromotionService } from 'src/app/_services/promotion.service';

@Component({
  selector: 'app-etudiant-details',
  templateUrl: './etudiant-details.component.html',
  styleUrls: ['./etudiant-details.component.css']
})
export class EtudiantDetailsComponent implements OnInit {

  currentEtudiant?:Etudiant;
  promos?:Promotion[];
  evaluations?:Evaluation[];
  constructor(private etudiantService:EtudiantService,
    private route:ActivatedRoute,
    private promotionService:PromotionService,
    private evalService:EvaluationService,
    private epreuveService:EpreuveService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe( param=>{
      const id = param['id'];
      this.chargerEtudiant(id);
      this.chargerEvals(id);
    })
  }

  chargerEtudiant(id:number){
    this.etudiantService.findById(id).subscribe({
      next:(v)=>{this.currentEtudiant=v;
        this.chargerPromos();
      },
      error:(e)=>{console.log(e);}
    })
  }

  debug(){

    console.log(this.promos);
    
  }

  chargerPromos(){
   this.promotionService.getAllPromosContainingEtudiant(this.currentEtudiant!.id).subscribe({
    next:(v)=>{this.promos=v},
    error:(e)=>{console.log(e);}
   })
  }

  chargerEvals(id:number){
    this.evalService.getAllByEtudiantId(id).subscribe({
      next:(v)=>{this.evaluations=v;
          this.evaluations?.forEach( (eva)=>{
            this.epreuveService.getById(eva.epreuveId).subscribe({
              next:(v)=>{eva.epreuveTitre=v.titre},
              error:(e)=>{console.log(e);},
            });

            
          })
      
      },
      error:(e)=>{console.log(e);}
    })
  }

}
