import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant';
import { Promotion } from 'src/app/_models/promotion';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { first } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SupprimerElementDialogComponent } from '../../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.css']
})
export class PromotionDetailsComponent implements OnInit {

  currentPromo?: Promotion;
  tp?: TitreProfessionnel[];
  etudiantsInPromo!: Etudiant[];
  etudiantsInPromoBuffer:Etudiant[]=[];
  etudiantsNotInPromo!: Etudiant[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  etudiants?: Etudiant[];
  etudiantsBuffer?: Etudiant[];
  searchStudentToAdd: string;
  afficherFormulaireAjoutEtudiant: boolean = false;
  etudiantAjoutId?: number;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  private nbrCaracAvantRecherche: number = 3

  constructor(
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    private titreProService: TitreProfessionnelService,
    private etudiantService: EtudiantService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.searchStudentToAdd = "";
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.promotionService.findById(id).subscribe({
        next: (v) => { this.currentPromo = v }
      });
      this.getTitrePro();
      this.getEtudiantsInPromo(id);
    }
    )
  }

  getTitrePro() {
    this.titreProService.getAll().subscribe({ next: (v) => { this.tp = v } })
  }

  getEtudiantsInPromo(id: number) {
    this.promotionService.getAllEtudiantsFromPromo(id).subscribe({
      next: (v) => {
        this.etudiantsInPromo = v;
        // on initialise le buffer des etudiants du tableau principal
        this.etudiantsInPromoBuffer=this.etudiantsInPromo;
        this.getAllEtudiants();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  ajouterEtudiant() {
    this.afficherFormulaireAjoutEtudiant = true;
  }

  getAllEtudiants() {
    this.etudiantService.getAll().subscribe({
      next: (v) => {
        this.etudiants = v;
        // on alimente etudiantNotInPromo avec  les etudiants qui ne sont pas deja dans la promo
        this.etudiantsNotInPromo = this.etudiants.filter((e) => { return !this.etudiantsInPromo?.some(etuProm => etuProm.id == e.id) });
        // on initialise le buffer du select
        this.etudiantsBuffer = this.etudiantsNotInPromo;
      }
    })
  }


  annulerRechercher() {
    this.searchExpression = "";
    this.rechercher();
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  //concerne les étudiants affichés dans le tableau principal
  rechercher() {
    this.etudiantsInPromoBuffer = this.etudiantsInPromo.filter((e)=>{
      return e.nom.toLowerCase().concat(e.prenom.toLowerCase()).toLowerCase().indexOf(this.searchExpression.toLowerCase()) !== -1;
    })
  }

  annulerAjout() {
    this.afficherFormulaireAjoutEtudiant = false;
  }

  validerAjout() {
    let p = this.currentPromo;
    if (this.etudiantAjoutId) {
      p?.etudiantsId.push(this.etudiantAjoutId)
    }
    this.promotionService.update(p!).subscribe(
      {
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.error(e);
        },
        complete:()=>{window.location.reload()}
      })
  }

  //concerne les étudiants affichés dans le select
  rechercherEtudiantAjout() {
    if (this.searchStudentToAdd.length >= this.nbrCaracAvantRecherche) {

      this.etudiantsBuffer = this.etudiantsNotInPromo?.filter((e) => {
        return e.nom.toLowerCase().concat(e.prenom.toLowerCase()).toLowerCase().indexOf(this.searchStudentToAdd.toLowerCase()) !== -1;
      })
    } else {
      this.etudiantsBuffer = this.etudiantsNotInPromo;
    }
  }

  removeEtudiant(etu:Etudiant){
    console.log(etu);
    
    let currentPromo = this.currentPromo;
    let index=currentPromo?.etudiantsId.indexOf(etu.id);
    console.log(index);
    
    if( index! >-1){

      this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
      this.dialogRef.componentInstance.elementName = " l'étudiant "+etu.prenom+" "+etu.nom+" de la promotion";
      this.dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
          currentPromo?.etudiantsId.splice(index!,1);
          this.promotionService.update(currentPromo!).subscribe({
            next:(v)=>{this.currentPromo=v},
            error:(e)=>{console.log(e)},
            complete:()=>{window.location.reload()}
          })
          }
          this.dialogRef = undefined;
        }
      )

    }
    

   
  }
  
}
