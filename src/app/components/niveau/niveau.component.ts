import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Niveau } from 'src/app/_models/niveau';
import { NiveauService } from 'src/app/_services/niveau.service';
import { ModifNiveauDialogComponent } from '../dialogs/modif-niveau-dialog/modif-niveau-dialog.component';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {

  niveaux?: Niveau[]
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  formulaireAjoutVisible: boolean = false;
  dialogRefModifNiveau?: MatDialogRef<ModifNiveauDialogComponent>;

  ajoutFormulaire: FormGroup = new FormGroup({
    codeCouleur: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    valeur: new FormControl("", Validators.required),
  })

  constructor(private niveauService: NiveauService,
    private dialog: MatDialog,
    private toastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    this.chargerNiveaux();
  }

  chargerNiveaux() {
    this.niveauService.findAll().subscribe({
      next: (v) => { this.niveaux = v },
      error: (e) => { console.log(e); }
    })
  }

  addNiveau() {

    let n: Niveau = new Niveau();
    n.description = this.ajoutFormulaire.value['description'];
    n.valeur = this.ajoutFormulaire.value['valeur'];
    n.codeCouleurHexa = this.ajoutFormulaire.value['codeCouleur'];

    this.niveauService.save(n).subscribe({
      next: (v) => {
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()

      },
      error: (e) => {
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()
      },
      complete: () => { this.chargerNiveaux() }
    })
  }

  editNiveau(ni: Niveau) {
    this.dialogRefModifNiveau = this.dialog.open(ModifNiveauDialogComponent, { disableClose: false });
    this.dialogRefModifNiveau.componentInstance.currentNiveau = ni;

    this.dialogRefModifNiveau.afterClosed().subscribe(
      result => {
        if (result) {
          this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
          this.chargerNiveaux();
        }
        this.dialogRefModifNiveau = undefined;
      }
    )
  }

  deleteNiveau(id: number, descr: string) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " le niveau " + descr;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.niveauService.delete(id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "Opération réussie").subscribe()

                this.chargerNiveaux();
              },
              error: (e) => {
                this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

              }
            })
        }
        this.dialogRef = undefined;
      }
    )
  }


  afficherForm() {
    this.formulaireAjoutVisible = true;
  }

  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }


}
