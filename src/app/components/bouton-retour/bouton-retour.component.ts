import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-bouton-retour',
  templateUrl: './bouton-retour.component.html',
  styleUrls: ['./bouton-retour.component.css']
})
export class BoutonRetourComponent implements OnInit {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }

  ngOnInit(): void {
  }


}
