import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Epreuve } from 'src/app/_models/epreuve';
import { Evaluation } from 'src/app/_models/evaluation';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';

@Component({
  selector: 'app-ajouter-eval-dialog',
  templateUrl: './ajouter-eval-dialog.component.html',
  styleUrls: ['./ajouter-eval-dialog.component.css']
})
export class AjouterEvalDialogComponent implements OnInit {

  etudiantId!:number;
  epreuves:Epreuve[]=[];

  constructor(
    public dialogRef: MatDialogRef<AjouterEvalDialogComponent>,
    private evalService: EvaluationService,
    private epreuveService:EpreuveService,
    private blocCompService: BlocCompetenceService,
    private toastEvokeService:ToastEvokeService,
  ) { }

  ajoutEvalFormulaire: FormGroup = new FormGroup({
    epreuveId: new FormControl("", Validators.required),
    note: new FormControl("", Validators.required),
    
  })


  ngOnInit(): void {
    this.epreuveService.findAll().subscribe({
      next:(v)=>{
        this.epreuves=v;
      },
      error:(e)=>{console.log(e);
      },
      complete:()=>{}
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(){
    let evalu = new Evaluation;
    evalu.etudiantId = this.etudiantId;
    evalu.epreuveId = this.ajoutEvalFormulaire.value['epreuveId'];
    evalu.note = this.ajoutEvalFormulaire.value['note'];

    this.evalService.save(evalu).subscribe({
      next:(v)=>{
      },
      error:(e)=>{

      },
      complete:()=>{this.dialogRef.close(true);}
    })
    
  }

}
