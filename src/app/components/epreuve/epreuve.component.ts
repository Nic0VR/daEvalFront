import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Epreuve } from 'src/app/_models/epreuve';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';

@Component({
  selector: 'app-epreuve',
  templateUrl: './epreuve.component.html',
  styleUrls: ['./epreuve.component.css']
})
export class EpreuveComponent implements OnInit {

  currentEpreuve?:Epreuve;
  evaluations?:Evaluation[];
  etudiants?:Etudiant[];

  constructor(
    private epreuveService:EpreuveService,
    private evalService:EvaluationService,
    private route:ActivatedRoute 
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id = params['id'];
      this.chargerEpreuve(id);
    })
  }

  chargerEpreuve(id:number){
    this.epreuveService.getById(id).subscribe({
      next:(v)=>{this.currentEpreuve=v},
      error:(e)=>{console.log(e);}
    })
  }

  chargerEvals(epreuveId:number){
    this.evalService.getAllByEpreuveId(epreuveId).subscribe({
      next:(v)=>{this.evaluations=v},
      error:(e)=>{console.log(e);}
    })
  }

}
