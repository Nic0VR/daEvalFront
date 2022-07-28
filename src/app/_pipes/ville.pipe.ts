import { Pipe, PipeTransform } from '@angular/core';
import { Ville } from '../_models/ville';
import { VilleService } from '../_services/ville.service';

@Pipe({
  name: 'ville'
})
export class VillePipe implements PipeTransform {
  villes!:Ville[];
  constructor(private villeService:VilleService){
   
    this.getVilleList();
    
  }

  transform(value: number): string | undefined {
    let ret = this.villes.find((v)=>v.id==value)?.nom;
    console.log("dans pipe ret=");
    console.log(ret);
    
    return ret
  }

  getVilleList(){
   this.villes=this.villeService.Villes;

  }
}
