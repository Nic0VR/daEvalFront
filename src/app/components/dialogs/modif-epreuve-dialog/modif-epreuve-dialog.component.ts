import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Competence } from 'src/app/_models/competence';
import { Epreuve } from 'src/app/_models/epreuve';
import { CompetenceService } from 'src/app/_services/competence.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { ModifierCompetenceDialogComponent } from '../modifier-competence-dialog/modifier-competence-dialog.component';

@Component({
  selector: 'app-modif-epreuve-dialog',
  templateUrl: './modif-epreuve-dialog.component.html',
  styleUrls: ['./modif-epreuve-dialog.component.css']
})
export class ModifEpreuveDialogComponent implements OnInit {

  // public compId!: number;
  currentEpr?:Epreuve;

  modifierEpreuveFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    type:new FormControl("",Validators.required)
    // blocCompetencesId: new FormControl("", Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<ModifierCompetenceDialogComponent>,
    private epreuveService:EpreuveService,
    
  ) { }
    
  ngOnInit(): void {
    // this.chagerComp();
    this.modifierEpreuveFormulaire.get('titre')?.setValue(this.currentEpr?.titre);
    this.modifierEpreuveFormulaire.get('description')?.setValue(this.currentEpr?.description);
    this.modifierEpreuveFormulaire.get('type')?.setValue(this.currentEpr?.type);

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(){
    let epr: Epreuve= this.currentEpr!;
    epr.description = this.modifierEpreuveFormulaire.value['description'];
    epr.titre = this.modifierEpreuveFormulaire.value['titre'];
    epr.type = this.modifierEpreuveFormulaire.value['type'];

    this.epreuveService.update(epr).subscribe({
      next:(v)=>{console.log("update reussi");
      },
      error:(e)=>{console.log(e);
      },
      complete:()=>{this.dialogRef.close(true);}
    })
    
  }


}
