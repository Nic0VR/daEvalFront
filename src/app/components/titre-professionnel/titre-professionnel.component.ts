import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { ModifOuAjoutTitreProDialogComponent } from '../dialogs/modif-ou-ajout-titre-pro-dialog/modif-ou-ajout-titre-pro-dialog.component';

@Component({
  selector: 'app-titre-professionnel',
  templateUrl: './titre-professionnel.component.html',
  styleUrls: ['./titre-professionnel.component.css']
})
export class TitreProfessionnelComponent implements OnInit {

 
  titresPro?: TitreProfessionnel[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;
  dialogRef?:MatDialogRef<ModifOuAjoutTitreProDialogComponent>;

  constructor(private formBuilder:FormBuilder,
     private titreProService:TitreProfessionnelService,
    private dialog:MatDialog,
    ) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    
  }

  ngOnInit(): void {
    this.getTitreProList();
  }

  getTitreProList(){
    this.titreProService.countTitreProfessionnels(this.searchExpression).pipe(first()).subscribe(countDto => {
      this.totalItems = countDto.nb;
    })

    this.titreProService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(tp=> {
      this.titresPro = tp;
    })
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getTitreProList();
  }

  onSubmit(){
    console.log("TODO RECHERCHE");
  }


  modifierTitrePro(tp:TitreProfessionnel){
    this.dialogRef = this.dialog.open(ModifOuAjoutTitreProDialogComponent, {disableClose: false});
    this.dialogRef.componentInstance.editMode=true;
    this.dialogRef.componentInstance.currentTitre=tp;
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
         this.titreProService.update(result).subscribe({
          next:(v)=>{},
          error:(e)=>{console.error(e);},
          complete:()=>{window.location.reload()}
         })
        }
        this.dialogRef = undefined;
      }
    ) 
  }

  ajouterTitrePro(){
    this.dialogRef = this.dialog.open(ModifOuAjoutTitreProDialogComponent, {disableClose: false});
 
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
         this.titreProService.save(result).subscribe({
          next:(v)=>{},
          error:(e)=>{console.error(e);},
          complete:()=>{
            window.location.reload()
          }
         })
        }
        this.dialogRef = undefined;
      }
    ) 
  }

}