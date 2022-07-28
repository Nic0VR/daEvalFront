import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Promotion } from 'src/app/_models/promotion';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { UserService } from 'src/app/_services/user.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';
import { first } from 'rxjs';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { VilleService } from 'src/app/_services/ville.service';
import { Ville } from 'src/app/_models/ville';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  promos?: Promotion[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  formulaireAjoutVisible: boolean = false;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  // titrePros?:TitreProfessionnel[];
  // villes?:Ville[];
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private promoService: PromotionService,
  ) {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;

  }

  ngOnInit(): void {

    this.getPromoList();

  }

  getPromoList() {
    this.promoService.countPromotion(this.searchExpression).pipe(first()).subscribe(countDto => {
      console.log("count dto :" + countDto.nb);

      this.totalItems = countDto.nb
    })

    this.promoService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(promos => {
      console.log(promos);

      this.promos = promos;
      // Inutile maintenant que les pipes ville et titrePro fonctionnement sans bug
      // this.promos.forEach((p)=>{
      //   this.villeService.getById(p.villeId).subscribe({
      //     next:(v)=>{p.villeNom=v.nom}
      //   });
      //   this.titreProService.findById(p.titreProfessionnelId).subscribe({
      //     next:(v)=>{p.titreProNom=v.titre.split('(')[0].split('Titre professionnel')[1];}
      //   })
      // })
    })
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getPromoList();
  }
  rechercher() {
    this.getPromoList()
  }
  annulerRechercher() {
    this.searchExpression = "";
    this.getPromoList();
  }

  ajouterNouvellePromo(){
    this.formulaireAjoutVisible=true;
  }
  supprimerPromotion(p:Promotion){
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " la promotion id=" +p.id ;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.promoService.delete(p.id).subscribe(
            {
              next: () => { console.log("Suppression réussie"); 
              window.location.reload();},
              error: (e) => { console.log(e);
              }
            })
        }
        this.dialogRef = undefined;
      }
    )
  }

  cacherFormulaireAjout(){
    this.formulaireAjoutVisible=false;
  }

}
