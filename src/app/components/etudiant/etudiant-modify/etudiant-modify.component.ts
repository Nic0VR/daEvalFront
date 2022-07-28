import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant';
import { Promotion } from 'src/app/_models/promotion';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { User } from 'src/app/_models/user';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-etudiant-modify',
  templateUrl: './etudiant-modify.component.html',
  styleUrls: ['./etudiant-modify.component.css']
})
export class EtudiantModifyComponent implements OnInit {

  constructor(private route:ActivatedRoute, private etudiantService: EtudiantService,private promotionService:PromotionService,
    private titreProService:TitreProfessionnelService) { }

  public roles:string[]=["FORMATEUR","ADMINISTRATEUR"];
  etudiantToModify?:Etudiant;
  promos!: Promotion[];
  tp?:TitreProfessionnel[];
  modifierEtudiantFormulaire:FormGroup = new FormGroup({
    nom:new FormControl("",Validators.required),
    prenom:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    // role:new FormControl("",Validators.required),
    
  })

  ngOnInit(): void {

    this.route.params.subscribe( param =>{
      const id = param['id'];

      this.etudiantService.findById(id).subscribe({next:(v:Etudiant)=>{
        this.etudiantToModify=v;
        this.modifierEtudiantFormulaire.get('nom')?.setValue(v.nom);
        this.modifierEtudiantFormulaire.get('prenom')?.setValue(v.prenom);
        this.modifierEtudiantFormulaire.get('email')?.setValue(v.email);
      }})

      this.getPromoList();
      this.titreProService.getAll().subscribe({next:(v)=>{this.tp=v}});
    })

  }

  modifyUser(){
    let e:Etudiant = this.etudiantToModify!;
    e.active=true;
    e.email=this.modifierEtudiantFormulaire.value["email"];
    e.motDePasse=this.modifierEtudiantFormulaire.value["password"];
    e.nom=this.modifierEtudiantFormulaire.value["nom"];
    e.prenom=this.modifierEtudiantFormulaire.value["prenom"];
    // e.role=this.modifierEtudiantFormulaire.value["role"];
    this.etudiantService.update(e).subscribe({
      next:(v)=>{
        console.log(v);
        
      }
    })
  }

  getPromoList(){
    this.promotionService.getAll().subscribe({next:(v)=>{this.promos=v}})
  }

}
