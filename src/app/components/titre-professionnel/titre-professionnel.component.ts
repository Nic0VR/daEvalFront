import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';

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

  constructor(private formBuilder:FormBuilder, private titreProService:TitreProfessionnelService ) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getTitreProList();
  }

  getTitreProList(){
    this.titreProService.countTitreProfessionnels(this.searchExpression).pipe(first()).subscribe(countDto => {
      console.log("count dto :" + countDto.nb);
      
      //this.totalItems = parseInt( countDto.Nb);
      console.log(this.totalItems);
      
    })

    this.titreProService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(tp=> {
      console.log(tp);
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




  ngOnInit(): void {
  }

}
