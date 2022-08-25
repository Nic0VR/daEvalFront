import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant';
import { Evaluation } from 'src/app/_models/evaluation';
import { Promotion } from 'src/app/_models/promotion';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { AjouterEvalDialogComponent } from '../../dialogs/ajouter-eval-dialog/ajouter-eval-dialog.component';
import { ModifEvalDialogComponent } from '../../dialogs/modif-eval-dialog/modif-eval-dialog.component';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-etudiant-details',
  templateUrl: './etudiant-details.component.html',
  styleUrls: ['./etudiant-details.component.css']
})
export class EtudiantDetailsComponent implements OnInit {

  currentEtudiant?:Etudiant;
  promos?:Promotion[];
  evaluations?:Evaluation[];
  dialogRef?: MatDialogRef<AjouterEvalDialogComponent>;
  dialogRefSupp?: MatDialogRef<SupprimerElementDialogComponent>;
  dialogRefModifEval?:MatDialogRef<ModifEvalDialogComponent>;

  constructor(private etudiantService:EtudiantService,
    private route:ActivatedRoute,
    private promotionService:PromotionService,
    private evalService:EvaluationService,
    private epreuveService:EpreuveService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe( param=>{
      const id = param['id'];
      this.chargerEtudiant(id);
      this.chargerEvals(id);
    })
  }

  chargerEtudiant(id:number){
    this.etudiantService.findById(id).subscribe({
      next:(v)=>{this.currentEtudiant=v;
        this.chargerPromos();
      },
      error:(e)=>{console.log(e);}
    })
  }

  debug(){

    console.log(this.promos);
    
  }

  chargerPromos(){
   this.promotionService.getAllPromosContainingEtudiant(this.currentEtudiant!.id).subscribe({
    next:(v)=>{this.promos=v},
    error:(e)=>{console.log(e);}
   })
  }

  chargerEvals(id:number){
    this.evalService.getAllByEtudiantId(id).subscribe({
      next:(v)=>{this.evaluations=v;
          this.evaluations?.forEach( (eva)=>{
            this.epreuveService.getById(eva.epreuveId).subscribe({
              next:(v)=>{eva.epreuveTitre=v.titre},
              error:(e)=>{console.log(e);},
            });

            
          })
      
      },
      error:(e)=>{console.log(e);}
    })
  }


  ajouterEval(){
    this.dialogRef = this.dialog.open(AjouterEvalDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.etudiantId = this.currentEtudiant?.id!;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
        window.location.reload();
        }
        this.dialogRef = undefined;
      }
    )

  }

  supprimerEval(evalu:Evaluation,etudiant:Etudiant){
    this.dialogRefSupp = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSupp.componentInstance.elementName = " l'évaluation de " +etudiant.nom+" "+etudiant.prenom;
    this.dialogRefSupp.afterClosed().subscribe(
      result => {
        if (result) {
          this.evalService.delete(evalu.id).subscribe(
            {
              next: () => { console.log("Suppression réussie"); 
              window.location.reload();},
              error: (e) => { console.log(e);
              }
            })
        }
        this.dialogRefSupp = undefined;
      }
    )
  }

  modifierEval(evalu:Evaluation){
    this.dialogRefModifEval= this.dialog.open(ModifEvalDialogComponent,{disableClose:false});
    this.dialogRefModifEval.componentInstance.currentEval=evalu;

    this.dialogRefModifEval.afterClosed().subscribe(
      result => {
        if (result) {
         window.location.reload();
        }
        this.dialogRefModifEval = undefined;
      }
    )
  }

}
