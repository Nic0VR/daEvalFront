import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { BlocCompetence } from 'src/app/_models/bloc-competence';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { CompetenceService } from 'src/app/_services/competence.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-details-titre-pro',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class TitreProDetailsComponent implements OnInit {

  currentTitre?: TitreProfessionnel;
  blocCompetences?: BlocCompetence[];
  formulaireAjoutVisible: boolean = false;

  // titrePros?: TitreProfessionnel[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;


  ajouterBlocCompetenceFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  })


  constructor(private blocCompetenceService: BlocCompetenceService,
    private formbuilder: FormBuilder,
    private titreProService: TitreProfessionnelService,
    private competenceService: CompetenceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastEvokeService: ToastEvokeService,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerCurrentTitre(id);
      this.chargerBlocComp(id);
    })
  }


  chargerCurrentTitre(id: number) {
    this.titreProService.findById(id).subscribe({
      next: (v) => { this.currentTitre = v; },
      error: (e) => { console.log(e); }
    })
  }

  chargerBlocComp(id: number) {

    this.blocCompetenceService.findByTitreProId(id).subscribe({
      next: (v) => {
        this.blocCompetences = v;
        this.blocCompetences.forEach((bloc, index: number) => {
          this.competenceService.findByBlocCompId(bloc.id).subscribe({
            next: (v) => { bloc.competences = v },
            error: (e) => {
              console.log(e);
            }
          })
        })
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  afficherFormulaireAjout() {
    this.formulaireAjoutVisible = true
  }

  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajouterBlocCompetenceFormulaire.reset();
  }

  addBlocComp() {
    let bc: BlocCompetence = new BlocCompetence();
    bc.titre = this.ajouterBlocCompetenceFormulaire.value['titre'];
    bc.description = this.ajouterBlocCompetenceFormulaire.value['description'];
    // bc.titreProfessionnelId = this.ajouterBlocCompetenceFormulaire.value['titreProId'];
    bc.titreProfessionnelId = this.currentTitre?.id!;
    this.blocCompetenceService.save(bc).subscribe({
      next: (v) => {
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
        this.ajouterBlocCompetenceFormulaire.reset();
        this.formulaireAjoutVisible=false;
      },
      error: (e) => {
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()
      },
      complete: () => { this.chargerBlocComp(this.currentTitre!.id) }
    })
  }

  removeBlocComp(b: BlocCompetence) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = "";
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.blocCompetenceService.delete(b.id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
                this.chargerBlocComp(this.currentTitre!.id);
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

}
