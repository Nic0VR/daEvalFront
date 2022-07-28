import { Component, OnInit } from '@angular/core';
import { TitreProfessionnel } from './_models/titre-professionnel';
import { Ville } from './_models/ville';
import { TitreProfessionnelService } from './_services/titre-professionnel.service';
import { VilleService } from './_services/ville.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eval';

  villes?:Ville[];
  titreProsCount?:number;
  constructor(
    private villeService:VilleService,
    private titreProService:TitreProfessionnelService
  ){

  }

  ngOnInit(): void {
    this.loadVille();
    this.loadtitrePro();
  }

  loadVille(){
    this.villeService.getAll().subscribe({
      next:(v)=>{this.villes=v;console.log("ville ok");
      },
      error:(e)=>{console.log(e);}
    })
  }

  loadtitrePro(){
    this.titreProService.countTitreProfessionnels("").subscribe({
      next:(v)=>{this.titreProsCount=v;console.log("count="+v);
      }
    })
  }
  
}
