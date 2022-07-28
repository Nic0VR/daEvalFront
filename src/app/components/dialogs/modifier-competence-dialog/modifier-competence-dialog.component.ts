import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Competence } from 'src/app/_models/competence';
import { CompetenceService } from 'src/app/_services/competence.service';

@Component({
  selector: 'app-modifier-competence-dialog',
  templateUrl: './modifier-competence-dialog.component.html',
  styleUrls: ['./modifier-competence-dialog.component.css']
})
export class ModifierCompetenceDialogComponent implements OnInit {
  public compId!: number;
  currentComp?:Competence;

  modifierCompetenceFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    // blocCompetencesId: new FormControl("", Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<ModifierCompetenceDialogComponent>,
    private competenceService:CompetenceService,
    
  ) { }
    
  ngOnInit(): void {
    // this.chagerComp();
    this.modifierCompetenceFormulaire.get('titre')?.setValue(this.currentComp?.titre);
    this.modifierCompetenceFormulaire.get('description')?.setValue(this.currentComp?.description);

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(){
    let comp:Competence = this.currentComp!;
    comp.description = this.modifierCompetenceFormulaire.value['description'];
    comp.titre = this.modifierCompetenceFormulaire.value['titre'];
    this.competenceService.update(comp).subscribe({
      next:(v)=>{console.log("update reussi");
      },
      error:(e)=>{console.log(e);
      },
      complete:()=>{this.dialogRef.close(true);}
    })
    
  }

  chargerComp(){
    this.competenceService.findById(this.compId).subscribe({
      next:(v)=>{this.currentComp=v;}
    })
  }
}
