import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private userService:UserService,
    private toastEvokeService:ToastEvokeService) { }

  public roles:string[]=["FORMATEUR","ADMINISTRATEUR"];
  @Output()
  cancelCreationEvent = new EventEmitter<boolean>(); 
  @Output()
  finishCreationEvent = new EventEmitter<boolean>();

  ajouterUtilisateurFormulaire:FormGroup = new FormGroup({
    nom:new FormControl("",Validators.required),
    prenom:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    role:new FormControl("",Validators.required),

  })

  ngOnInit(): void {
  }

  addUser(){
    let u:User = new User();
    u.email=this.ajouterUtilisateurFormulaire.value["email"];
    u.motDePasse=this.ajouterUtilisateurFormulaire.value["password"];
    u.nom=this.ajouterUtilisateurFormulaire.value["nom"];
    u.prenom=this.ajouterUtilisateurFormulaire.value["prenom"];
    u.role=this.ajouterUtilisateurFormulaire.value["role"];
    u.active=true;
    console.log(u);
    this.userService.save(u).subscribe({
      next:(v)=>{
        this.toastEvokeService.success('Sauvegarde Réussie', 'La sauvegarde a été effectuée').subscribe();
      }
      ,error:(e)=>{
        this.toastEvokeService.warning('Erreur','Une erreur est survenue'+e.error)
      }
      ,complete:()=>{
        this.finishCreationEvent.emit(true);
      }
    })
  }

  annulerCreation(){
    this.cancelCreationEvent.emit(true);
  }
}
