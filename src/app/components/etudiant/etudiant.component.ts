import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { Etudiant } from 'src/app/_models/etudiant';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { UserService } from 'src/app/_services/user.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { Promotion } from 'src/app/_models/promotion';
import { PromotionService } from 'src/app/_services/promotion.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  etudiants?: Etudiant[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  formulaireAjoutVisible: boolean = false;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  promos?: Promotion[];

  constructor(private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private dialog: MatDialog,
    private promotionService: PromotionService,
    private toastEvokeService: ToastEvokeService) {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;

  }

  annulerCreation() {
    this.formulaireAjoutVisible = false;
  }

  getStudentList() {
    this.etudiantService.countStudents(this.searchExpression).pipe(first()).subscribe(countDto => {
     

      this.totalItems = countDto.nb
    })

    this.etudiantService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(users => {
  

      this.etudiants = users;
    })
  }


  annulerRechercher() {
    this.searchExpression = "";
    this.getStudentList();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getStudentList();
  }

  rechercher() {
    this.getStudentList()
  }

  ngOnInit(): void {
    this.getStudentList();
    this.getPromoList();
  }

  ajouterEtudiant() {
    this.formulaireAjoutVisible = true;
  }

  supprimerEtudiant(e: User) {
    // const confirmBox = new ConfirmBoxInitializer();
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " l'étudiant " + e.nom + " " + e.prenom;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.etudiantService.delete(e.id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success("Suppression","La suppression a été effectuée ").subscribe();
                this.getStudentList();
              },
              error: (e) => {
                this.toastEvokeService.danger("Erreur","La suppression a échouée").subscribe();
              }
            })
        }
        this.dialogRef = undefined;
      }
    )
  }

  getPromoList() {
    this.promotionService.getAll().subscribe({ next: (v) => { this.promos = v } })
  }
}
