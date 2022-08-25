import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Epreuve } from 'src/app/_models/epreuve';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';

@Component({
  selector: 'app-modif-eval-dialog',
  templateUrl: './modif-eval-dialog.component.html',
  styleUrls: ['./modif-eval-dialog.component.css']
})
export class ModifEvalDialogComponent implements OnInit {

  currentEval?: Evaluation;
  epreuves?: Epreuve[];

  search: string = "";
  etudiants?: Etudiant[];
  openFromEpreuvePage: boolean = false;

  modifierEvalFormulaire: FormGroup = new FormGroup({
    epreuveId: new FormControl("", Validators.required),
    note: new FormControl("", Validators.required),

  })

  modifierEvalFormulaire2: FormGroup = new FormGroup({
    etudiantId: new FormControl("", Validators.required),
    note: new FormControl("", Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<ModifEvalDialogComponent>,
    private evalService: EvaluationService,
    private epreuveService: EpreuveService,
    private etudiantService:EtudiantService,
  ) { }

  ngOnInit(): void {
    // this.chagerComp();
    if (!this.openFromEpreuvePage) {
      this.modifierEvalFormulaire.get('epreuveId')?.setValue(this.currentEval?.epreuveId);
      this.modifierEvalFormulaire.get('note')?.setValue(this.currentEval?.note);
      this.chargerEpreuves();
    } else {
     
      this.modifierEvalFormulaire2.get('note')?.setValue(this.currentEval?.note);
      this.modifierEvalFormulaire2.get('etudiantId')?.setValue(this.currentEval?.etudiantId);
      this.rechercherEtudiants(true);
    }


  }

  chargerEpreuves() {
    this.epreuveService.findAll().subscribe({
      next: (v) => {
        this.epreuves = v;
      },
      error: (e) => {
        console.error(e);
      },

    })
  }

  rechercherEtudiants(force?:boolean){
    if (this.search.length >= 3 || force==true) {
      this.etudiantService.getAllPage(1, 10, this.search).subscribe({
        next: (v) => { this.etudiants = v; console.log("recherche");
         },
        error: (e) => { console.log(e); },
        complete: () => { }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    let evalu: Evaluation = this.currentEval!;
    if (!this.openFromEpreuvePage) {
      evalu.epreuveId = this.modifierEvalFormulaire.value['epreuveId'];
      evalu.note = this.modifierEvalFormulaire.value['note'];
    } else {

      evalu.note = this.modifierEvalFormulaire2.value['note'];
      evalu.etudiantId = this.modifierEvalFormulaire2.value['etudiantId'];
    }


    this.evalService.update(evalu).subscribe({
      next: (v) => {
        console.log("update reussi");
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => { this.dialogRef.close(true); }
    })

  }
}
