import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Promotion } from 'src/app/_models/promotion';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { Ville } from 'src/app/_models/ville';
import { PromotionService } from 'src/app/_services/promotion.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';
import { VilleService } from 'src/app/_services/ville.service';

@Component({
  selector: 'app-promotion-modify',
  templateUrl: './promotion-modify.component.html',
  styleUrls: ['./promotion-modify.component.css']
})
export class PromotionModifyComponent implements OnInit {


  titrePros?:TitreProfessionnel[];
  villes?:Ville[]
  currentPromo?:Promotion;
  constructor(private titreProService:TitreProfessionnelService,
    private villeService:VilleService,
    private promoService:PromotionService,
    private router:Router,
    private route:ActivatedRoute,
    private toastEvokeService:ToastEvokeService,
    ) { }

  modifierPromoFormulaire: FormGroup = new FormGroup({
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl("", Validators.required),
    titrePro: new FormControl("", Validators.required),
    ville: new FormControl("", Validators.required),
  })

  ngOnInit(): void {
    this.chargerTitrePro();
    this.chargerVille();
    this.route.params.subscribe( params=>{
      const id = params['id']
      this.chargerPromo(id);
    })
  }

  submit(){
    let p:Promotion = this.currentPromo!;
    p.dateDebut = this.modifierPromoFormulaire.value['dateDebut'];
    p.dateFin = this.modifierPromoFormulaire.value['dateFin'];
    p.titreProfessionnelId= this.modifierPromoFormulaire.value['titrePro'];
    p.villeId= this.modifierPromoFormulaire.value['ville'];
    this.promoService.update(p).subscribe({
      next:(v)=>{
        this.toastEvokeService.success('Succès', "Opération réussie").subscribe()

      },
      error:(e)=>{
        this.toastEvokeService.danger('Erreur', "Erreur: " + e.error.message).subscribe()

      },
      complete:()=>{
        this.router.navigateByUrl('/main/promotions/details/'+this.currentPromo?.id)
      }
    })
  }

  chargerPromo(id:number){
    this.promoService.findById(id).subscribe({
      next:(v)=>{this.currentPromo=v;
        this.modifierPromoFormulaire.get('dateDebut')?.setValue(this.currentPromo?.dateDebut);
         this.modifierPromoFormulaire.get('dateFin')?.setValue(this.currentPromo?.dateFin);
         this.modifierPromoFormulaire.get('titrePro')?.setValue(this.currentPromo?.titreProfessionnelId);
         this.modifierPromoFormulaire.get('ville')?.setValue(this.currentPromo?.villeId);
      },
      error:(e)=>{console.log(e);
      }
    })
  }

  chargerTitrePro(){
    this.titreProService.getAll().subscribe({
      next:(v)=>{this.titrePros=v},
      error:(e)=>{console.log(e);
      }
    })
  }

  chargerVille(){
    this.villeService.getAll().subscribe({
      next:(v)=>{this.villes=v},
      error:(e)=>{console.log(e);},
    })
  }
}
