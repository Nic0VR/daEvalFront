import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Epreuve } from 'src/app/_models/epreuve';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';
import { ModifEvalDialogComponent } from '../dialogs/modif-eval-dialog/modif-eval-dialog.component';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-epreuve',
  templateUrl: './epreuve.component.html',
  styleUrls: ['./epreuve.component.css']
})
export class EpreuveComponent implements OnInit {

  currentEpreuve?: Epreuve;
  evaluations?: Evaluation[];
  etudiants?: Etudiant[];
  formAjoutVisible: boolean = false;
  search: string = "";
  searchForm: FormGroup;
  etudiantsForm: Etudiant[] = [];
  loadComplete: boolean = false;
  loadEvalComplete: boolean = false;
  loadEtudiantComplete: boolean = false;

  dialogRefSupp?: MatDialogRef<SupprimerElementDialogComponent>;
  dialogRefModifEval?:MatDialogRef<ModifEvalDialogComponent>;

  ajouterEvalFormulaire: FormGroup = new FormGroup({
    // epreuveId: new FormControl("", Validators.required),
    note: new FormControl("", Validators.required),
    // blocCompetencesId: new FormControl("", Validators.required),
    etudiantId: new FormControl("", Validators.required),
  })


  constructor(
    private epreuveService: EpreuveService,
    private evalService: EvaluationService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,

  ) {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.chargerEpreuve(id);
        this.chargerEvals(id);
  
      }
 
    })
  }

  chargerEpreuve(id: number) {
    this.epreuveService.getById(id).subscribe({
      next: (v) => {
        this.currentEpreuve = v;
        console.log("epr ok");
        console.log(v);

      },
      error: (e) => { console.log(e); }
    })
  }

  chargerEtudiants(id: number) {
    this.etudiantService.getEtudiantByEpreuveId(id).subscribe({
      next: (v) => {
        this.etudiants = v; console.log("etu ok"); console.log(v);
        this.evaluations?.forEach((ev) => {

          let etu = this.etudiants?.find(etu =>  etu.id == ev.etudiantId )
          console.log("etu");
          console.log(etu);
          
          ev.etudiantNom = etu?.nom;
          ev.etudiantPrenom = etu?.prenom;
          console.log(ev);
        });
        console.log(this.evaluations);
        
      },
      error: (e) => { console.log(e); },
      complete:()=>{this.loadComplete = true;}
    })
  }
  chargerEvals(epreuveId: number) {
    this.evalService.getAllByEpreuveId(epreuveId).subscribe({
      next: (v) => {
        this.evaluations = v;
        console.log("eval ok");
        console.log(v);
        


      },
      error: (e) => { console.log(e); },
      complete:()=>{this.chargerEtudiants(epreuveId);}
    })
  }

  afficherFormAjout() {
    this.formAjoutVisible = true;
  }
  cacherFormAjout() {
    this.formAjoutVisible = false;
  }

  rechercherEtudiants() {
    if (this.search.length >= 3) {
      console.log("recherche");

      this.etudiantService.getAllPage(1, 10, this.search).subscribe({
        next: (v) => { this.etudiantsForm = v },
        error: (e) => { console.log(e); },
        complete: () => { }
      })
    }

  }

  addEval() {
    let ev: Evaluation = new Evaluation;
    ev.epreuveId = this.currentEpreuve?.id!;
    ev.note = this.ajouterEvalFormulaire.value['note'];
    ev.etudiantId = this.ajouterEvalFormulaire.value['etudiantId'];
    this.evalService.save(ev).subscribe({
      next: (v) => { },
      error: (e) => {
        console.log(e);
      },
      complete: () => { window.location.reload() }
    })
  }

  supprimerEval(evalu:Evaluation,etudiant:Etudiant){
    this.dialogRefSupp = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSupp.componentInstance.elementName = " l'évaluation de " +etudiant.nom+" "+etudiant.prenom;
    this.dialogRefSupp.afterClosed().subscribe(
      result => {
        if (result) {
          this.evalService.delete(evalu.id).subscribe(
            {
              next: () => { console.log("Suppression réussie"); 
              window.location.reload();},
              error: (e) => { console.log(e);
              }
            })
        }
        this.dialogRefSupp = undefined;
      }
    )
  }

  modifierEval(evalu:Evaluation){
    this.dialogRefModifEval= this.dialog.open(ModifEvalDialogComponent,{disableClose:false});
    this.dialogRefModifEval.componentInstance.currentEval=evalu;
    this.dialogRefModifEval.componentInstance.openFromEpreuvePage=true;
    this.dialogRefModifEval.afterClosed().subscribe(
      result => {
        if (result) {
         window.location.reload();
        }
        this.dialogRefModifEval = undefined;
      }
    )
  }


}
