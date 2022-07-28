import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Etudiant } from 'src/app/_models/etudiant';
import { EtudiantService } from 'src/app/_services/etudiant.service';


@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrls: ['./etudiant-create.component.css']
})
export class EtudiantCreateComponent implements OnInit {

  constructor(private etudiantService:EtudiantService) { }
  @Output() 
  annulerCreationEvent=new EventEmitter();

  ajouterEtudiantFormulaire:FormGroup = new FormGroup({
    nom:new FormControl("",Validators.required),
    prenom:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
 })


  ngOnInit(): void {
  }

  addEtudiant(){
    let e:Etudiant = new Etudiant();
    e.active=true;
    e.email= this.ajouterEtudiantFormulaire.value['email'];
    e.prenom= this.ajouterEtudiantFormulaire.value['prenom'];
    e.nom= this.ajouterEtudiantFormulaire.value['nom'];
    e.motDePasse= this.ajouterEtudiantFormulaire.value['password'];
    this.etudiantService.save(e).subscribe({next:(v)=>{
      console.log(v);
    }})
  }

  annulerCreation(){
    this.annulerCreationEvent.emit();
  }
}
