import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BlocCompetence } from 'src/app/_models/bloc-competence';
import { Competence } from 'src/app/_models/competence';
import { Epreuve } from 'src/app/_models/epreuve';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { CompetenceService } from 'src/app/_services/competence.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { ModifEpreuveDialogComponent } from '../../dialogs/modif-epreuve-dialog/modif-epreuve-dialog.component';
import { ModifierCompetenceDialogComponent } from '../../dialogs/modifier-competence-dialog/modifier-competence-dialog.component';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-bloc-details',
  templateUrl: './bloc-details.component.html',
  styleUrls: ['./bloc-details.component.css']
})
export class BlocDetailsComponent implements OnInit {

  currentBloc?: BlocCompetence;
  competences?: Competence[];
  formulaireAjoutVisible: boolean = false;
  formulaireAjoutEpreuveVisible: boolean = false;
  dialogRefSup?: MatDialogRef<SupprimerElementDialogComponent>;
  dialogRefModif?:MatDialogRef<ModifierCompetenceDialogComponent>;
  dialogRefModifEpr?:MatDialogRef<ModifEpreuveDialogComponent>;
  titrePro?: TitreProfessionnel[];

  epreuves?:Epreuve[];

  ajouterCompetenceFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    // blocCompetencesId: new FormControl("", Validators.required),
  })

  ajouterEpreuveFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    // blocCompetencesId: new FormControl("", Validators.required),
    type:new FormControl("", Validators.required),
  })

  constructor(private blocCompService: BlocCompetenceService,
    private route: ActivatedRoute,
    private competenceService: CompetenceService,
    private titreProService: TitreProfessionnelService,
    private dialog:MatDialog,
    private epreuveService:EpreuveService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerBloc(id);
      this.chargerEpreuves(id);
    })
  }

  chargerBloc(id: number) {
    this.blocCompService.findById(id).subscribe({
      next: (v) => {
        this.currentBloc = v;
        this.chargerCompetences(this.currentBloc?.id!)
      },
      error: (e) => { console.log(e); }
    })
  }

  chargerCompetences(blocId: number) {
    this.competenceService.findByBlocCompId(blocId).subscribe({
      next: (v) => { this.competences = v },
      error: (e) => {
        console.log(e);
      }
    })
  }

  chargerEpreuves(id:number){
    this.epreuveService.getByBlocCompId(id).subscribe({
      next:(v)=>{this.epreuves=v},
      error:(e)=>{console.log(e);}
    })
  }


  afficherFormulaireAjout() {
    this.formulaireAjoutVisible = true;
  }

  annulerAjout() {
    this.formulaireAjoutVisible = false;
  }

  addCompetence() {
    let comp = new Competence();
    comp.titre = this.ajouterCompetenceFormulaire.value['titre'];
    comp.description = this.ajouterCompetenceFormulaire.value['description'];
    // comp.blocCompetencesId = this.ajouterCompetenceFormulaire.value['blocCompetencesId'];
    comp.blocCompetencesId=this.currentBloc?.id!;
    this.competenceService.save(comp).subscribe({
      next:(v)=>{window.location.reload()},
      error:(e)=>{console.log(e);}
    })
  }



  chargerTitrePro() {
    this.titreProService.getAll().subscribe({
      next: (v) => { this.titrePro = v },
      error: (e) => { console.log(e); }

    })
  }


  removeComp(c:Competence){
    this.dialogRefSup = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSup.componentInstance.elementName = ` la compétence ${c.titre} `;
    this.dialogRefSup.afterClosed().subscribe(
      result => {
        if (result) {
          this.competenceService.delete(c.id).subscribe(
            {
              next: () => { console.log("Suppression réussie"); 
              window.location.reload();},
              error: (e) => { console.log(e);
              }
            })
        }
        this.dialogRefSup = undefined;
      }
    ) 
  }

  modifComp(c:Competence){
    this.dialogRefModif = this.dialog.open(ModifierCompetenceDialogComponent, {disableClose: false});
    this.dialogRefModif.componentInstance.currentComp=c;
    this.dialogRefModif.afterClosed().subscribe(
      result => {
        if (result) {
         
        }
        this.dialogRefModif = undefined;
      }
    ) 
  }


  removeEpreuve(ep:Epreuve){
    this.dialogRefSup = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSup.componentInstance.elementName = ` l'épreuve ${ep.titre}`;
    this.dialogRefSup.afterClosed().subscribe(
      result => {
        if (result) {
          this.epreuveService.delete(ep.id).subscribe(
            {
              next: () => { console.log("Suppression réussie"); 
              window.location.reload();},
              error: (e) => { console.log(e);
              }
            })
        }
        this.dialogRefSup = undefined;
      }
    ) 
  }

  editEpreuve(ep:Epreuve){
    this.dialogRefModifEpr = this.dialog.open(ModifEpreuveDialogComponent, { disableClose: false });
    // this.dialogRefModifEpr.componentInstance.elementName = ` l'épreuve ${ep.titre}`;
    this.dialogRefModifEpr.componentInstance.currentEpr=ep;
    this.dialogRefModifEpr.afterClosed().subscribe(
      result => {
        if (result) {
         window.location.reload();
        }
        this.dialogRefSup = undefined;
      }
    ) 
  }


  annulerAjoutEpreuve(){
    this.formulaireAjoutEpreuveVisible=false;
  }
  afficherFormEpreuve(){
    this.formulaireAjoutEpreuveVisible=true;
  }

  addEpreuve(){
    let e:Epreuve = new Epreuve();
    e.blocCompetencesId= this.currentBloc?.id!;
    e.titre = this.ajouterEpreuveFormulaire.value['titre'];
    e.description = this.ajouterEpreuveFormulaire.value['description'];
    e.type = this.ajouterEpreuveFormulaire.value['type'];
    this.epreuveService.save(e).subscribe({
      next:(v)=>{window.location.reload()},
      error:(e)=>{console.log(e);}
    })
  }


  
}
