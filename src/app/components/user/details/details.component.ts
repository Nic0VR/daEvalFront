import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Formation } from 'src/app/_models/formation';
import { Intervention } from 'src/app/_models/intervention';
import { Promotion } from 'src/app/_models/promotion';
import { User } from 'src/app/_models/user';
import { FormationService } from 'src/app/_services/formation.service';
import { InterventionService } from 'src/app/_services/intervention.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { UserService } from 'src/app/_services/user.service';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser?: User
  interventions?: Intervention[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  formulaireAjoutVisible:boolean=false;
  promotions?:Promotion[];
  formations?:Formation[];
  
  ajoutFormulaire: FormGroup = new FormGroup({
    formation: new FormControl("", Validators.required),
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl("", Validators.required),
    promotion: new FormControl("", Validators.required),

  })

  constructor(private userService: UserService,
    private intervService: InterventionService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private promotionService:PromotionService,
    private formationService:FormationService,
    private toastEvokeService: ToastEvokeService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerInterventions(id);
      this.chargerUser(id);
    })
    this.chargerFormations();
    this.chargerPromo();
  }

  chargerInterventions(id: number) {
    this.intervService.findAllByFormateurId(id).subscribe({
      next: (v) => { this.interventions = v },
      error: (e) => { console.log(e); },
      complete: () => { }
    })
  }

  deleteInterv(id: number) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " l'intervention " ;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.intervService.delete(id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
                this.chargerInterventions(this.currentUser!.id);
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

  chargerUser(id:number){
    this.userService.findById(id).subscribe({
      next:(v)=>{this.currentUser=v},
      error:(e)=>{console.log(e);},
    })
  }


  chargerPromo(){

    this.promotionService.getAll().subscribe({
      next:(v)=>{
        this.promotions=v
      },
      error:(e)=>{console.log(e);},
      complete:()=>{}
    })

  }

  chargerFormations(){
    
   this.formationService.findAll().subscribe({
    next:(v)=>{this.formations=v},
    error:(e)=>{console.log(e);},

   })
  }


  annulerAjout() {
    this.formulaireAjoutVisible=false;
    this.ajoutFormulaire.reset();
  }

  addInterv(){
    let interv:Intervention = new Intervention();
    interv.formateurId = this.currentUser!.id;
    interv.formationId = this.ajoutFormulaire.value['formation'];
    interv.promotionId = this.ajoutFormulaire.value['promotion'];
    interv.dateDebut = this.ajoutFormulaire.value['dateDebut'];
    interv.dateFin = this.ajoutFormulaire.value['dateFin'];
    this.intervService.save(interv).subscribe({
      next:(v)=>{
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()

      },
      error:(e)=>{
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

      },
      complete:()=>{this.chargerInterventions(this.currentUser!.id)}
    })
  }
  
  afficherForm(){
    this.formulaireAjoutVisible=true;
  }

}
