import { first } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users?: User[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  formulaireAjoutVisible: boolean = false;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private etudiantService: EtudiantService,
    private toastEvokeService: ToastEvokeService
  ) {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUsersList();
  }

  getUsersList() {
    this.userService.countUsers(this.searchExpression).pipe(first()).subscribe(countDto => {
    

      this.totalItems = countDto.nb
    })

    this.userService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(users => {


      this.users = users;
      // users[0].getRole.call() 
    })
  }

  annulerCreation() {
    this.formulaireAjoutVisible = false;
  }

  annulerRechercher() {
    this.searchExpression = "";
    this.getUsersList();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getUsersList();
  }

  rechercher() {
    this.getUsersList()
  }

  ngOnInit(): void {
  }

  ajouterUtilisateur() {
    this.formulaireAjoutVisible = true;
  }

  supprimerUtilisateur(u: User) {
    // const confirmBox = new ConfirmBoxInitializer();
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " l'utilisateur " + u.nom + " " + u.prenom + ", rôle:" + u.role;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.delete(u.id).subscribe(
            {
              next: () => {
                this.toastEvokeService.success('Suppression Réussie', 'La sauvegarde a été effectuée').subscribe();
                this.rechercher();
              },
              error: (e) => {
                this.toastEvokeService.danger('Erreur', 'Une erreur est survenue: ' + e.error.message)

              }
            })
        }
        this.dialogRef = undefined;
      }
    )
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
                this.toastEvokeService.success('Suppression Réussie', 'La sauvegarde a été effectuée').subscribe();
                this.rechercher();
              },
              error: (e) => {
                this.toastEvokeService.danger('Erreur', 'Une erreur est survenue: ' + e.error.message)
              }
            })
        }
        this.dialogRef = undefined;
      }
    )
  }
}
