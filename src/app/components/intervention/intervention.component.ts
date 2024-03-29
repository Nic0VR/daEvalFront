import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Formateur } from 'src/app/_models/formateur';
import { Formation } from 'src/app/_models/formation';
import { Intervention } from 'src/app/_models/intervention';
import { Promotion } from 'src/app/_models/promotion';
import { User } from 'src/app/_models/user';
import { FormationService } from 'src/app/_services/formation.service';
import { InterventionService } from 'src/app/_services/intervention.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { UserService } from 'src/app/_services/user.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  interventions?: Intervention[];
  formulaireAjoutVisible: boolean = false;
  promotions?: Promotion[];
  formations?: Formation[];
  formateurs?: Formateur[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  ajoutFormulaire: FormGroup = new FormGroup({
    formation: new FormControl("", Validators.required),
    formateur: new FormControl("", Validators.required),
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl("", Validators.required),
    promotion: new FormControl("", Validators.required),

  })

  constructor(private interventionService: InterventionService,
    private userService: UserService,
    private promotionService: PromotionService,
    private formationService: FormationService,
    private dialog: MatDialog,
    private toastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    this.rechercherInterv();

  }







  pageChanged(page: number) {
    this.currentPage = page;
    this.rechercherInterv();
  }

  rechercherInterv() {
    this.interventionService.findAllPage(this.currentPage, this.itemsPerPage, "").subscribe({
      next: (v) => {
        this.interventions = v;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.interventions!.forEach((inter) => {
          this.formationService.getById(inter.formationId).subscribe({
            next:(v)=>{
              this.formations?.push(v);
              inter.formation=v;
            },
            error:(e)=>{}
          })
          this.userService.findById(inter.formateurId).subscribe({
            next:(v)=>{
              inter.formateurNomComplet=v.nom+" "+v.prenom;
              this.formateurs?.push(v);
            },
            error:(e)=>{

            }
          }),
          this.promotionService.findById(inter.promotionId).subscribe({
            next:(v)=>{
              inter.promotion=v;

            }
          })
        });
      }
    })
    this.interventionService.count("").subscribe({
      next: (v) => { this.totalItems = v.nb },
      error: (e) => { console.log(e); },
      complete: () => { }
    })
  }


  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }

  addInterv() {
    let interv: Intervention = new Intervention();
    interv.formateurId = this.ajoutFormulaire.value['formateur'];
    interv.formationId = this.ajoutFormulaire.value['formation'];
    interv.promotionId = this.ajoutFormulaire.value['promotion'];
    interv.dateDebut = this.ajoutFormulaire.value['dateDebut'];
    interv.dateFin = this.ajoutFormulaire.value['dateFin'];
    this.interventionService.save(interv).subscribe({
      next: (v) => {
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
      },
      error: (e) => {
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

      },
      complete: () => {
        this.rechercherInterv();
      }
    })
  }

  afficherForm() {
    this.formulaireAjoutVisible = true;
  }

  deleteInterv(id: number) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " l'intervention ";
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.interventionService.delete(id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
                this.rechercherInterv()
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
