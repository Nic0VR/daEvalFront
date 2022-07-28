import { Pipe, PipeTransform } from '@angular/core';
import { TitreProfessionnel } from '../_models/titre-professionnel';
import { TitreProfessionnelService } from '../_services/titre-professionnel.service';

@Pipe({
  name: 'titrePro'
})
export class TitreProPipe implements PipeTransform {

  titresPros!: TitreProfessionnel[];
  constructor(private titreProService:TitreProfessionnelService){
    this.getTitreProList();
  }

  transform(value: number) :string|undefined {
    return this.titresPros.find((t)=>t.id==value)?.titre.split('(')[0].split('Titre professionnel')[1];
  }

  getTitreProList(){
    this.titresPros = this.titreProService.TitrePros;
  }
}
