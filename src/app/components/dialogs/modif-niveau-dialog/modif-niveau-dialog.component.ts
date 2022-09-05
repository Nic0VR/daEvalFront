import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Niveau } from 'src/app/_models/niveau';
import { NiveauService } from 'src/app/_services/niveau.service';

@Component({
  selector: 'app-modif-niveau-dialog',
  templateUrl: './modif-niveau-dialog.component.html',
  styleUrls: ['./modif-niveau-dialog.component.css']
})
export class ModifNiveauDialogComponent implements OnInit {

  currentNiveau!:Niveau;

  modifierNiveauFormulaire: FormGroup = new FormGroup({
    codeCouleur: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    valeur: new FormControl("", Validators.required),
  })

  constructor( public dialogRef: MatDialogRef<ModifNiveauDialogComponent>,
    private niveauService:NiveauService) { }

  ngOnInit(): void {
    this.modifierNiveauFormulaire.get('codeCouleur')?.setValue(this.currentNiveau.codeCouleurHexa);
    this.modifierNiveauFormulaire.get('description')?.setValue(this.currentNiveau.description);
    this.modifierNiveauFormulaire.get('valeur')?.setValue(this.currentNiveau.valeur);


  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    let n:Niveau = this.currentNiveau;
    n.description=this.modifierNiveauFormulaire.value['description'];
    n.codeCouleurHexa=this.modifierNiveauFormulaire.value['codeCouleur'];
    n.valeur=this.modifierNiveauFormulaire.value['valeur'];
    this.niveauService.update(n).subscribe({
      next:(v)=>{
        this.dialogRef.close(true);
      },
      error:(e)=>{console.log(e);this.dialogRef.close(false)},
      complete:()=>{}
    })
  }

}
