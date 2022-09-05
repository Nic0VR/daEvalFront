import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  interventions?:Intervention[];
  formulaireAjoutVisible:boolean=false;
  promotions?:Promotion[];
  formations?:Formation[];
  formateurs?:Formateur[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  ajoutFormulaire: FormGroup = new FormGroup({
    formation: new FormControl("", Validators.required),
    formateur: new FormControl("", Validators.required),
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl("", Validators.required),
    promotion: new FormControl("", Validators.required),

  })

  constructor(private interventionService:InterventionService,
    private userService:UserService,
    private promotionService:PromotionService,
    private formationService:FormationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.rechercherInterv();
    this.chargerFormateurs();
    this.chargerFormations();
    this.chargerPromo();
  }

  

  chargerFormateurs(){
    this.formateurs = this.userService.Formateurs;
  }

  chargerPromo(){
    this.promotionService.getAll().subscribe({
      next:(v)=>{this.promotions=v},
      error:(e)=>{console.log(e);},
      complete:()=>{}
    })
  }

  chargerFormations(){
    this.formations=this.formationService.Formations;
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.rechercherInterv();
  }

  rechercherInterv(){
    this.interventionService.findAllPage(this.currentPage,this.itemsPerPage,"").subscribe({
      next:(v)=>{
        this.interventions=v;
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
      }
    })

    this.interventionService.count("").subscribe({
      next:(v)=>{this.totalItems = v.nb},
      error:(e)=>{console.log(e);},
      complete:()=>{}
    })
  }


  annulerAjout() {
    this.formulaireAjoutVisible=false;
    this.ajoutFormulaire.reset();
  }

  addInterv(){
    let interv:Intervention = new Intervention();
    interv.formateurId = this.ajoutFormulaire.value['formateur'];
    interv.formationId = this.ajoutFormulaire.value['formation'];
    interv.promotionId = this.ajoutFormulaire.value['promotion'];
    interv.dateDebut = this.ajoutFormulaire.value['dateDebut'];
    interv.dateFin = this.ajoutFormulaire.value['dateFin'];
    this.interventionService.save(interv).subscribe({
      next:(v)=>{},
      error:(e)=>{},
      complete:()=>{window.location.reload()}
    })
  }
  
  afficherForm(){
    this.formulaireAjoutVisible=true;
  }

  deleteInterv(id:number){
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " l'intervention " ;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.interventionService.delete(id).subscribe(
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
