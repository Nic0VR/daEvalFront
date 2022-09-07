import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Formation } from 'src/app/_models/formation';
import { FormationService } from 'src/app/_services/formation.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  formations?: Formation[]
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  search: string = "";
  formulaireAjoutVisible: boolean = false;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;

  constructor(
    private formationService: FormationService,
    private toastEvokeService: ToastEvokeService,
    private dialog: MatDialog,

  ) { }


  ajoutFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    slug: new FormControl("", Validators.required),
    duree: new FormControl("", Validators.required),
    objectifsPedagogiques: new FormControl("", Validators.required),

  })


  ngOnInit(): void {
    this.rechercherFormations();
  }

  rechercherFormations() {

    this.formationService.count(this.search).subscribe({
      next: (v) => { this.totalItems = v.nb },
      error: (e) => {
        console.log(e);
      }
    })
    this.formationService.findAllPage(this.currentPage, this.itemsPerPage, this.search).subscribe({
      next: (v) => {
        this.formations = v;
      },
      error: (e) => { console.log(e); }
    })
  }



  annulerRechercher() {
    this.search = "";
    this.rechercherFormations();
  }

  afficherForm() {
    this.formulaireAjoutVisible = true;
  }

  addFormation() {
    let formation: Formation = new Formation();
    formation.titre = this.ajoutFormulaire.value['titre'];
    formation.slug = this.ajoutFormulaire.value['slug'];
    formation.duree = this.ajoutFormulaire.value['duree'];
    formation.objectifsPedagogiques = this.ajoutFormulaire.value['objectifsPedagogiques'];
    this.formationService.save(formation).subscribe({
      next: (v) => {
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
        this.formulaireAjoutVisible=false;
        this.ajoutFormulaire.reset();
      },
      error: (e) => {
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

      },
      complete: () => { this.rechercherFormations() }
    })
  }

  supprimerFormation(f: Formation) {

    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " la formation " + f.titre;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.formationService.delete(f.id).subscribe({
            next: (v) => {
              this.toastEvokeService.success('Succès', "Opération réussie").subscribe()

            },
            error: (e) => {
              this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

            },
            complete: () => {
              this.rechercherFormations()
            }
          }

          )
        }
      })
  }

  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.rechercherFormations();
  }
}
