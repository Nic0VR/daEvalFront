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
import { PositionnementService } from 'src/app/_services/positionnement.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { EvaluationService } from 'src/app/_services/evaluation.service';

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
    private positionnementService: PositionnementService,
    private toastEvokeService: ToastEvokeService,
    private evalService: EvaluationService,
    private titreProService:TitreProfessionnelService
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

      this.totalItems = countDto.nb
    })

    this.promoService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(
      {
        next: (v) => {
          this.promos = v;

        },
        error: (e) => { },
        complete: () => {
          this.promos!.forEach((p)=>{
           this.titreProService.findById(p.titreProfessionnelId).subscribe({
            next:(v)=>{
              p.titreProNom = v.titre;
            },

            })
          })
         }
      }
    )
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getPromoList();
  }

  annulerRechercher() {
    this.searchExpression = "";
    this.getPromoList();
  }

  ajouterNouvellePromo() {
    this.formulaireAjoutVisible = true;
  }
  supprimerPromotion(p: Promotion) {
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " la promotion id=" + p.id;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.promoService.delete(p.id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Succès', "Opération réussie").subscribe()
                this.getPromoList();
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

  cacherFormulaireAjout() {
    this.formulaireAjoutVisible = false;
  }


  GetPdfPos(id: number) {
    this.positionnementService.generateGrillePromo(id).subscribe({
      next: (data) => {

        let downloadURL2 = window.URL.createObjectURL(data);
        let link2 = document.createElement('a');
        link2.href = downloadURL2;
        link2.download = "GrillePositionnementPromo.pdf";
        link2.click();
      },
      error: (e) => { },
      complete: () => { }
    })
  }

  GetZipEval(id: number) {
    this.evalService.generateBulletinByPromo(id).subscribe({
      next: (data) => {

        let downloadURL2 = window.URL.createObjectURL(data);
        let link2 = document.createElement('a');
        link2.href = downloadURL2;
        link2.download = "evalsPromo" + id + ".zip";
        link2.click();
      },
      error: (e) => { },
      complete: () => { }
    })
  }

}
