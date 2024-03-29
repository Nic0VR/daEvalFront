import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { Intervention } from 'src/app/_models/intervention';
import { Niveau } from 'src/app/_models/niveau';
import { Positionnement } from 'src/app/_models/positionnement';
import { Promotion } from 'src/app/_models/promotion';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';
import { InterventionService } from 'src/app/_services/intervention.service';
import { NiveauService } from 'src/app/_services/niveau.service';
import { PositionnementService } from 'src/app/_services/positionnement.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { UserService } from 'src/app/_services/user.service';
import { AjouterEvalDialogComponent } from '../../dialogs/ajouter-eval-dialog/ajouter-eval-dialog.component';
import { ModifEvalDialogComponent } from '../../dialogs/modif-eval-dialog/modif-eval-dialog.component';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-etudiant-details',
  templateUrl: './etudiant-details.component.html',
  styleUrls: ['./etudiant-details.component.css']
})
export class EtudiantDetailsComponent implements OnInit {

  currentEtudiant?: Etudiant;
  promos?: Promotion[];
  evaluations?: Evaluation[];
  dialogRef?: MatDialogRef<AjouterEvalDialogComponent>;
  dialogRefSupp?: MatDialogRef<SupprimerElementDialogComponent>;
  dialogRefModifEval?: MatDialogRef<ModifEvalDialogComponent>;
  positionnements?: Positionnement[];
  formulaireAjoutVisible: boolean = false;
  niveaux?: Niveau[];
  interventions?: Intervention[];

  ajoutFormulaire: FormGroup = new FormGroup({
    intervention: new FormControl("", Validators.required),
    niveauDebut: new FormControl("", Validators.required),
    niveauFin: new FormControl("", Validators.required),

  })

  constructor(private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private promotionService: PromotionService,
    private evalService: EvaluationService,
    private epreuveService: EpreuveService,
    private positionnementService: PositionnementService,
    private interventionService: InterventionService,
    private userService: UserService,
    private niveauService: NiveauService,
    private dialog: MatDialog,
    private toastEvokeService: ToastEvokeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.chargerEtudiant(id);
      this.chargerEvals(id);
      this.chargerPositionnements(id);
      this.chargerNiveaux();
 
    })
  }

  chargerEtudiant(id: number) {
    this.etudiantService.findById(id).subscribe({
      next: (v) => {
        this.currentEtudiant = v;
        this.chargerPromos();
      },
      error: (e) => { console.log(e); }
    })
  }

  chargerPromos() {
    this.promotionService.getAllPromosContainingEtudiant(this.currentEtudiant!.id).subscribe({
      next: (v) => { this.promos = v },
      error: (e) => { console.log(e); }
    })
  }

  chargerEvals(id: number) {
    this.evalService.getAllByEtudiantId(id).subscribe({
      next: (v) => {
        this.evaluations = v;
        this.evaluations?.forEach((eva) => {
          this.epreuveService.getById(eva.epreuveId).subscribe({
            next: (v) => { eva.epreuveTitre = v.titre },
            error: (e) => { console.log(e); },
          });


        })

      },
      error: (e) => { console.log(e); }
    })
  }


  ajouterEval() {
    this.dialogRef = this.dialog.open(AjouterEvalDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.etudiantId = this.currentEtudiant?.id!;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.toastEvokeService.success('Succès', "L'opération s'est bien déroulée").subscribe()
          this.chargerEvals(this.currentEtudiant!.id);
        }
        this.dialogRef = undefined;
      }
    )

  }

  supprimerEval(evalu: Evaluation, etudiant: Etudiant) {
    this.dialogRefSupp = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSupp.componentInstance.elementName = " l'évaluation de " + etudiant.nom + " " + etudiant.prenom;
    this.dialogRefSupp.afterClosed().subscribe(
      result => {
        if (result) {
          this.evalService.delete(evalu.id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "L'opération s'est bien déroulée").subscribe()
                this.chargerEvals(evalu.etudiantId);
              },
              error: (e) => {
                this.toastEvokeService.danger('Erreur', "Erreur: " + e.erreur.message).subscribe()

              }
            })
        }
        this.dialogRefSupp = undefined;
      }
    )
  }

  modifierEval(evalu: Evaluation) {
    this.dialogRefModifEval = this.dialog.open(ModifEvalDialogComponent, { disableClose: false });
    this.dialogRefModifEval.componentInstance.currentEval = evalu;

    this.dialogRefModifEval.afterClosed().subscribe(
      result => {
        if (result) {
          this.toastEvokeService.success('Succès', "L'opération s'est bien déroulée").subscribe()
          this.chargerEvals(evalu.etudiantId);
        }
        this.dialogRefModifEval = undefined;
      }
    )
  }


  chargerPositionnements(etudiantId: number) {
    this.positionnementService.findAllByEtudiantId(etudiantId).subscribe({
      next: (v) => { this.positionnements = v },
      error: (e) => { console.log(e); },
      complete: () => {
        this.positionnements?.forEach((pos) => {
          this.interventionService.getById(pos.interventionId).subscribe({
            next: (interv) => {
              pos.intervention = interv;
              this.userService.findById(interv.formateurId).subscribe({
                next:(user)=>{
                  pos.intervention!.formateurNomComplet = user.nom+" "+user.prenom;
                }
              })
            }
          })
        })
      }
    })
  }

  addPositionnement() {
    let posi: Positionnement = new Positionnement();
    posi.etudiantId = this.currentEtudiant!.id;
    posi.interventionId = this.ajoutFormulaire.value['intervention'];
    posi.niveauDebutId = this.ajoutFormulaire.value['niveauDebut'];
    posi.niveauFinId = this.ajoutFormulaire.value['niveauFin'];

    this.positionnementService.save(posi).subscribe({
      next: (v) => { this.toastEvokeService.success('Succès', "L'opération s'est bien déroulée").subscribe() },
      error: (e) => {
        this.toastEvokeService.danger('Erreur', 'Une erreur est survenue: ' + e.error.message).subscribe()

      },
      complete: () => { }
    })
  }

  afficherForm() {
    this.formulaireAjoutVisible = true;
  }
  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }
  

  chargerNiveaux() {
    this.niveauService.findAll().subscribe({
      next: (v) => { this.niveaux = v },
      error: (e) => { console.log(e); },
      complete: () => {
      },
    })
  }

  supprimerPos(id: number) {
    this.dialogRefSupp = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSupp.componentInstance.elementName = " le positionnement ";
    this.dialogRefSupp.afterClosed().subscribe(
      result => {
        if (result) {
          this.positionnementService.delete(id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "L'opération s'est bien déroulée").subscribe()

              },
              error: (e) => {
                this.toastEvokeService.danger('Erreur', 'Une erreur est survenue: ' + e.error.message).subscribe()
              }
            })
        }
        this.dialogRef = undefined;
      }
    )
  }

  GetBulletin(id: number) {
    this.evalService.generateBulletinByStudentAndPromo(this.currentEtudiant!.id, id).subscribe({
      next: (data) => {

        // let blob = new Blob([data], {type: 'application/pdf'});

        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = "bulletinIndividuel.pdf";
        link.click();
      },
      error: (e) => { },
      complete: () => { }
    })
  }

  getGrillePos() {

    this.positionnementService.generateGrilleEtudiant(this.currentEtudiant!.id).subscribe({
      next: (data) => {

        let downloadURL2 = window.URL.createObjectURL(data);
        let link2 = document.createElement('a');
        link2.href = downloadURL2;
        link2.download = "GrillePositionnementIndividuelle.pdf";
        link2.click();
      },
      error: (e) => { },
      complete: () => { }
    })
  }
}
