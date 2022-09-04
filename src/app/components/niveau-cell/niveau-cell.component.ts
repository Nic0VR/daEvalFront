import { Component, Input, OnInit } from '@angular/core';
import { Niveau } from 'src/app/_models/niveau';
import { NiveauService } from 'src/app/_services/niveau.service';

@Component({
  selector: 'app-niveau-cell',
  templateUrl: './niveau-cell.component.html',
  styleUrls: ['./niveau-cell.component.css']
})
export class NiveauCellComponent implements OnInit {

  constructor(private niveauService:NiveauService) { }
  @Input()
  niveauId!:number;

  niveau?:Niveau;
  style:string= ""
  ngOnInit(): void {
    this.niveau=this.niveauService.Niveaux.find((n)=> n.id==this.niveauId);
    if(this.niveau){
      this.style="background-color:"+this.niveau.codeCouleurHexa+";"
    }
  }

}
