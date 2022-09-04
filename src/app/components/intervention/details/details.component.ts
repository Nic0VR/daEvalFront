import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Niveau } from 'src/app/_models/niveau';
import { Positionnement } from 'src/app/_models/positionnement';
import { NiveauService } from 'src/app/_services/niveau.service';
import { PositionnementService } from 'src/app/_services/positionnement.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  positionnements?: Positionnement[];
  niveaux?: Niveau[];
  isLoaded:boolean=false;
  constructor(private positionnementService: PositionnementService,
    private niveauService: NiveauService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerPositionnements(id);
    })
  }

  chargerPositionnements(id: number) {

    this.positionnementService.findAllByInterventionId(id).subscribe({
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
        this.positionnements?.forEach((p) => {
          console.log("positionnement :");
          console.log(p);
          
          
          let codeHexDebut = this.niveaux?.find((n) => { n.id == p.niveauDebutId })?.codeCouleurHexa;
          console.log("code hex deb");
          console.log(codeHexDebut);
          
          p.codeHexNiveauDebut = codeHexDebut;

          let codeHexFin = this.niveaux?.find((n) => { n.id == p.niveauFinId })?.codeCouleurHexa;
          p.codeHexNiveauFin = codeHexFin;
          console.log(p);
          
        });
        this.isLoaded=true;
      },
    })
  }


}
