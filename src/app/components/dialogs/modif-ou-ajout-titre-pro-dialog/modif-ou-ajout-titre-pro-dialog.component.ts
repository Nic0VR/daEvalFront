import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';

@Component({
  selector: 'app-modif-ou-ajout-titre-pro-dialog',
  templateUrl: './modif-ou-ajout-titre-pro-dialog.component.html',
  styleUrls: ['./modif-ou-ajout-titre-pro-dialog.component.css']
})
export class ModifOuAjoutTitreProDialogComponent implements OnInit {

  currentTitre?:TitreProfessionnel;
  editMode?:boolean;

  
  formulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    slug: new FormControl("", Validators.required),
  })

  constructor(    
    public dialogRef: MatDialogRef<ModifOuAjoutTitreProDialogComponent>,
    ) { }

  ngOnInit(): void {

    if(this.editMode){
      this.formulaire.get('titre')?.setValue(this.currentTitre?.titre);
      this.formulaire.get('slug')?.setValue(this.currentTitre?.slug);

    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    if(this.currentTitre){
      let tp:TitreProfessionnel = this.currentTitre;
      tp.slug= this.formulaire.value['slug'];
      tp.titre = this.formulaire.value['titre'];
      this.dialogRef.close(tp);

    }else{
      let tp:TitreProfessionnel = new TitreProfessionnel;
      tp.slug= this.formulaire.value['slug'];
      tp.titre = this.formulaire.value['titre'];
      this.dialogRef.close(tp);

    }
  }
}
