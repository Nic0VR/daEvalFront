import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData{
    titre:string;  
}



@Component({
  selector: 'app-supprimer-element-dialog',
  templateUrl: './supprimer-element-dialog.component.html',
  styleUrls: ['./supprimer-element-dialog.component.css']
})
export class SupprimerElementDialogComponent implements OnInit {

  public elementName!: string;
  
  constructor(
    public dialogRef: MatDialogRef<SupprimerElementDialogComponent>,
    
  ) { }
    
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(){
    this.dialogRef.close(true);
  }
}
