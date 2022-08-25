import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BlocCompetence } from 'src/app/_models/bloc-competence';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { CompetenceService } from 'src/app/_services/competence.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-bloc-competences',
  templateUrl: './bloc-competences.component.html',
  styleUrls: ['./bloc-competences.component.css']
})
export class BlocCompetencesComponent implements OnInit {

  blocCompetences?: BlocCompetence[];
  formulaireAjoutVisible: boolean = false;
  searchForm: FormGroup;
  titrePros?: TitreProfessionnel[];
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;

  // variables pagination pour les titres pro dans le select
  searchExpression: string = "";
  itemsPerPage: number = 10;
  currentPage: number = 1;
  // pour la table des blocs
  searchExpressionB: string = "";
  itemsPerPageB: number = 5;
  currentPageB: number = 1;
  totalItems:number=0;

  ajouterBlocCompetenceFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    titreProId: new FormControl("", Validators.required),
  })

  constructor(private blocCompetenceService: BlocCompetenceService,
    private formbuilder: FormBuilder,
    private titreProService: TitreProfessionnelService,
    private competenceService: CompetenceService,
    private dialog: MatDialog
  ) {

    this.searchForm = this.formbuilder.group({
      searchExpression: ['']
    });



  }

  ngOnInit(): void {

    this.chargerBlocComp();
    this.chargerTitrePros();

  }

  chargerTitrePros() {

    this.titreProService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).subscribe({
      next: (v) => { this.titrePros = v },
      error: (e) => { console.log(e); }
    });
  }

  chargerBlocComp() {


    this.blocCompetenceService.count(this.searchExpressionB).subscribe({
      next:(v)=>{this.totalItems=v.nb},
      error:(e)=>{console.log(e);}
    })

    this.blocCompetenceService.getAllPage(this.currentPageB, this.itemsPerPageB, this.searchExpressionB).subscribe({
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
    bc.titreProfessionnelId = this.ajouterBlocCompetenceFormulaire.value['titreProId'];
    this.blocCompetenceService.save(bc).subscribe({
      next: (v) => { },
      error: (e) => { console.log(e); },
      complete: () => { window.location.reload() }
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


  rechercher() {
    this.chargerTitrePros();
  }

  annulerRechercher() {
    this.searchExpression = "";
    this.chargerTitrePros();
  }

  rechercherB(){
    this.chargerBlocComp();
  }

  annulerRechercherB(){
    this.searchExpressionB = "";
    this.chargerBlocComp();

  }

  pageChanged(page: number) {
    this.currentPageB = page;
    // this.getStudentList();
    this.chargerBlocComp()
  }

}
