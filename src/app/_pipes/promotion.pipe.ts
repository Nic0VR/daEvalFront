import { Pipe, PipeTransform } from '@angular/core';
import { Promotion } from '../_models/promotion';
import { Ville } from '../_models/ville';
import { PromotionService } from '../_services/promotion.service';
import { VilleService } from '../_services/ville.service';

@Pipe({
  name: 'promotion'
})
export class PromotionPipe implements PipeTransform {

  promotions!:Promotion[]
  villes!:Ville[];
  constructor(private promoService:PromotionService,
    private villeService:VilleService){
    this.getPromos();
    this.getVilles();
  }

  transform(value: number): string {
    let promo = this.promotions.find((p)=>p.id==value);
    if(promo){
      let ville =this.villes.find((v)=>v.id==promo!.villeId)?.nom;
      if(ville){
        let result = ville+" du "+promo.dateDebut+" au "+promo.dateFin;
        return result;
      }
  
    }
    return "no data";
  }

  getPromos(){
    this.promotions= this.promoService.Promotions;
  }

  getVilles(){
    this.villes=this.villeService.Villes;
  }
}
