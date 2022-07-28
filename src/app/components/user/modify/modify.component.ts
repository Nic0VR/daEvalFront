import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class UserModifyComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService:UserService) { }

  public roles:string[]=["FORMATEUR","ADMINISTRATEUR"];
  userToModify?:User;
  isEtudiant?:boolean;

  modifierUtilisateurFormulaire:FormGroup = new FormGroup({
    nom:new FormControl("",Validators.required),
    prenom:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    role:new FormControl("",Validators.required),
    
  })

  ngOnInit(): void {

    this.route.params.subscribe( param =>{
      const id = param['id'];
      this.userService.findById(id).subscribe({next:(v:User)=>{
        this.userToModify = v;
        this.isEtudiant = this.userToModify.role =="ETUDIANT";
        this.modifierUtilisateurFormulaire.get('nom')?.setValue(v.nom);
        this.modifierUtilisateurFormulaire.get('prenom')?.setValue(v.prenom);
        this.modifierUtilisateurFormulaire.get('email')?.setValue(v.email);
        // this.modifierUtilisateurFormulaire.get('password')?.setValue(v.motDePasse);
        this.modifierUtilisateurFormulaire.get('role')?.setValue(v.role);
      }})
    })

  }

  modifyUser(){
    let u:User = this.userToModify!;
    u.active=true;
    u.email=this.modifierUtilisateurFormulaire.value["email"];
    // u.motDePasse=this.modifierUtilisateurFormulaire.value["password"];
    
    u.nom=this.modifierUtilisateurFormulaire.value["nom"];
    u.prenom=this.modifierUtilisateurFormulaire.value["prenom"];
    u.role=this.modifierUtilisateurFormulaire.value["role"];
    this.userService.update(u).subscribe({
      next:(v)=>{
        console.log(v);
        
      }
    })
  }
}
