import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  positionnements?:Positionnement[];
  formulaireAjoutVisible:boolean=false;
  niveaux?: Niveau[];
  interventions?:Intervention[];

  ajoutFormulaire: FormGroup = new FormGroup({
    intervention: new FormControl("", Validators.required),
    niveauDebut: new FormControl("", Validators.required),
    niveauFin: new FormControl("", Validators.required),

  })
  
  constructor(private etudiantService:EtudiantService,
    private route:ActivatedRoute,
    private promotionService:PromotionService,
    private evalService:EvaluationService,
    private epreuveService:EpreuveService,
    private positionnementService:PositionnementService,
    private interventionService:InterventionService,
    private niveauService:NiveauService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe( param=>{
      const id = param['id'];
      this.chargerEtudiant(id);
      this.chargerEvals(id);
      this.chargerPositionnements(id);
      this.chargerNiveaux();
      this.chargerInterventions();
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


  chargerPositionnements(etudiantId:number){
    this.positionnementService.findAllByEtudiantId(etudiantId).subscribe({
      next:(v)=>{this.positionnements=v},
      error:(e)=>{console.log(e);}
    })
  }

  addPositionnement(){
    let posi:Positionnement=new Positionnement();
    posi.etudiantId = this.currentEtudiant!.id;
    posi.interventionId = this.ajoutFormulaire.value['intervention'];
    posi.niveauDebutId = this.ajoutFormulaire.value['niveauDebut'];
    posi.niveauFinId = this.ajoutFormulaire.value['niveauFin'];

    this.positionnementService.save(posi).subscribe({
      next:(v)=>{},
      error:(e)=>{console.log(e);},
      complete:()=>{window.location.reload()}
    })
  }

  afficherForm(){
    this.formulaireAjoutVisible = true;
  }
  annulerAjout() {
    this.formulaireAjoutVisible = false;
    this.ajoutFormulaire.reset();
  }
  chargerInterventions(){
    this.interventionService.findAll().subscribe({
      next:(v)=>{this.interventions=v},
      error:(e)=>{console.log(e);}
    })
  }

  chargerNiveaux() {
    this.niveauService.findAll().subscribe({
      next: (v) => { this.niveaux = v },
      error: (e) => { console.log(e); },
      complete: () => {        
      },
    })
  }

  supprimerPos(id:number){
    this.dialogRefSupp = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSupp.componentInstance.elementName = " le positionnement " ;
    this.dialogRefSupp.afterClosed().subscribe(
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

  GetBulletin(id:number){
    this.evalService.generateBulletinByStudentAndPromo(this.currentEtudiant!.id,id).subscribe({
      next:(data) => {

        let blob = new Blob([data], {type: 'application/pdf'});
      
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "bulletinIndividuel.pdf";
        link.click();
      },
      error:(e)=>{},
      complete:()=>{}
    })
  }

  getGrillePos(){}
}
