import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Niveau } from 'src/app/_models/niveau';
import { Positionnement } from 'src/app/_models/positionnement';
import { NiveauService } from 'src/app/_services/niveau.service';
import { PositionnementService } from 'src/app/_services/positionnement.service';
import { SupprimerElementDialogComponent } from '../dialogs/supprimer-element-dialog/supprimer-element-dialog.component';

@Component({
  selector: 'app-positionnement',
  templateUrl: './positionnement.component.html',
  styleUrls: ['./positionnement.component.css']
})
export class PositionnementComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  positionnements?:Positionnement[];
  niveaux?:Niveau[];
  isLoaded:boolean=false;
  dialogRef?: MatDialogRef<SupprimerElementDialogComponent>;
  search:string="";
  constructor(private positionnementService:PositionnementService,
    private niveauService: NiveauService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.chargerPositionnements();
  }


  chargerPositionnements() {

    this.positionnementService.count("").subscribe({
      next:(v)=>{this.totalItems=v.nb},
      error:(e)=>{},

    })

    this.positionnementService.findAllPage(this.currentPage,this.itemsPerPage,this.search).subscribe({
      next: (v) => {
        this.positionnements = v; console.log(v);
      },
      error: (e) => { console.log(e); },
      complete: () => {
        this.chargerNiveaux();

      }
    })
  }

  chargerNiveaux() {
    this.niveauService.findAll().subscribe({
      next: (v) => { this.niveaux = v },
      error: (e) => { console.log(e); },
      complete: () => {
        this.isLoaded = true;
      },
    })
  }


  deletePos(id:number){
    this.dialogRef = this.dialog.open(SupprimerElementDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.elementName = " le positionnement " ;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.positionnementService.delete(id).subscribe(
            {
              next: () => {
                // console.log("Suppression réussie");
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

  pageChanged(page: number) {
    this.currentPage = page;
    this.chargerPositionnements();
  }
}
