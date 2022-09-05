import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant';
import { Intervention } from 'src/app/_models/intervention';
import { Niveau } from 'src/app/_models/niveau';
import { Positionnement } from 'src/app/_models/positionnement';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { InterventionService } from 'src/app/_services/intervention.service';
import { NiveauService } from 'src/app/_services/niveau.service';
import { PositionnementService } from 'src/app/_services/positionnement.service';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  positionnements?: Positionnement[];
  niveaux?: Niveau[];
  isLoaded: boolean = false;
  formulaireAjoutVisible: boolean = false;
  currentInterv?: Intervention;
  etudiants?: Etudiant[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;


  ajoutFormulaire: FormGroup = new FormGroup({
    etudiant: new FormControl("", Validators.required),
    niveauDebut: new FormControl("", Validators.required),
    niveauFin: new FormControl("", Validators.required),

  })


  constructor(private positionnementService: PositionnementService,
    private niveauService: NiveauService,
    private route: ActivatedRoute,
    private interventionService: InterventionService,
    private dialog: MatDialog,
    private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerPositionnements(id);
      this.chargerInterv(id);
      this.chargerEtudiants();
    })
  }

  chargerInterv(id: number) {
    this.interventionService.getById(id).subscribe({
      next: (v) => { this.currentInterv = v ;console.log("current interv");
      console.log(this.currentInterv);
      
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  chargerPositionnements(id: number) {

    this.positionnementService.findAllByInterventionId(id).subscribe({
      next: (v) => {
        this.positionnements = v; console.log(v);
      },
      error: (e) => { console.log(e); },
      complete: () => {
        this.chargerNiveaux();

      }
    })
  }

  chargerNiveaux() {
    this.niveauService.findAll().subscribe({
      next: (v) => { this.niveaux = v },
      error: (e) => { console.log(e); },
      complete: () => {

        this.isLoaded = true;
      },
    })
  }


  chargerEtudiants() {
    this.etudiantService.getAll().subscribe({
      next: (v) => {
        this.etudiants = v;
        ;
      },
      error: (e) => { console.log(e); }
    })
  }

  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }

  afficherForm() {
    this.formulaireAjoutVisible = true;
  }

  addPositionnement() {
    let p: Positionnement = new Positionnement();
    p.etudiantId = this.ajoutFormulaire.value['etudiant'];
    p.niveauDebutId = this.ajoutFormulaire.value['niveauDebut'];
    p.niveauFinId = this.ajoutFormulaire.value['niveauFin'];
    p.interventionId = this.currentInterv!.id;
    this.positionnementService.save(p).subscribe({
      next: (v) => { },
      error: (e) => { },
      complete: () => { window.location.reload() }
    })
  }

  deletePos(id: number) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " le positionnement ";
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.positionnementService.delete(id).subscribe(
            {
              next: () => {
                console.log("Suppression réussie");
                window.location.reload();
              },
              error: (e) => {
                console.log(e);
              }
            })
        }
        this.dialogRef = undefined;
      }
    )

  }

}
