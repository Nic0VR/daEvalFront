import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BlocCompetence } from 'src/app/_models/bloc-competence';
import { Competence } from 'src/app/_models/competence';
import { Epreuve } from 'src/app/_models/epreuve';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { ModifEpreuveDialogComponent } from '../dialogs/modif-epreuve-dialog/modif-epreuve-dialog.component';
import { ModifierCompetenceDialogComponent } from '../dialogs/modifier-competence-dialog/modifier-competence-dialog.component';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-epreuve-liste',
  templateUrl: './epreuve-liste.component.html',
  styleUrls: ['./epreuve-liste.component.css']
})
export class EpreuveListeComponent implements OnInit {


  formulaireAjoutEpreuveVisible: boolean = false;
  dialogRefSup?: MatDialogRef<SupprimerElementDialogComponent>;

  dialogRefModifEpr?: MatDialogRef<ModifEpreuveDialogComponent>;
  epreuves?: Epreuve[];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  search: string = "";
  totalItems:number=0;
  blocComps: BlocCompetence[] = [];
  searchExpressionB:string="";
  totalItemsB:number=0
  currentPageB:number=1;
  itemsPerPageB:number=15;
  
  ajouterEpreuveFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    blocCompetencesId: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
  })

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private epreuveService: EpreuveService,
    private blocCompetenceService : BlocCompetenceService,) { }

  ngOnInit(): void {

    this.chargerEpreuves();
    this.chargerBlocComp();
  }


  removeEpreuve(ep: Epreuve) {
    this.dialogRefSup = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRefSup.componentInstance.elementName = ` l'épreuve ${ep.titre}`;
    this.dialogRefSup.afterClosed().subscribe(
      result => {
        if (result) {
          this.epreuveService.delete(ep.id).subscribe(
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
        this.dialogRefSup = undefined;
      }
    )
  }

  chargerEpreuves() {
    this.epreuveService.findAllPage(this.currentPage, this.itemsPerPage, this.search).subscribe({
      next: (v) => { this.epreuves = v },
      error: (e) => { console.log(e); }
    })

    this.epreuveService.count(this.search).subscribe({
      next:(v)=>{this.totalItems=v.nb},
      error:(e)=>{ console.log(e); },
    })
  }


  editEpreuve(ep: Epreuve) {
    this.dialogRefModifEpr = this.dialog.open(ModifEpreuveDialogComponent, { disableClose: false });
    // this.dialogRefModifEpr.componentInstance.elementName = ` l'épreuve ${ep.titre}`;
    this.dialogRefModifEpr.componentInstance.currentEpr = ep;
    this.dialogRefModifEpr.afterClosed().subscribe(
      result => {
        if (result) {
          window.location.reload();
        }
        this.dialogRefSup = undefined;
      }
    )
  }

  annulerAjoutEpreuve() {
    this.formulaireAjoutEpreuveVisible = false;
  }
  afficherFormEpreuve() {
    this.formulaireAjoutEpreuveVisible = true;
  }

  addEpreuve() {
    if(this.ajouterEpreuveFormulaire.valid){
      let e: Epreuve = new Epreuve();
      // e.blocCompetencesId= this.currentBloc?.id!;
      e.blocCompetencesId = this.ajouterEpreuveFormulaire.value['blocCompetencesId']
      e.titre = this.ajouterEpreuveFormulaire.value['titre'];
      e.description = this.ajouterEpreuveFormulaire.value['description'];
      e.type = this.ajouterEpreuveFormulaire.value['type'];
      this.epreuveService.save(e).subscribe({
        next: (v) => { window.location.reload() },
        error: (e) => { console.log(e); }
      })
    }
   
  }

  rechercher() {
    this.chargerEpreuves();
  }
  annulerRechercher(){
    this.search="";
    this.chargerEpreuves();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.chargerEpreuves();
  }

  chargerBlocComp() {
    this.blocCompetenceService.count(this.searchExpressionB).subscribe({
      next:(v)=>{this.totalItemsB=v.nb},
      error:(e)=>{console.log(e);}
    })

    this.blocCompetenceService.getAllPage(this.currentPageB, this.itemsPerPageB, this.searchExpressionB).subscribe({
      next: (v) => {
        this.blocComps = v;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  rechercherB() {
    this.chargerBlocComp()
  }
  annulerRechercherB(){
    this.searchExpressionB="";
    this.chargerBlocComp()
  }

}
