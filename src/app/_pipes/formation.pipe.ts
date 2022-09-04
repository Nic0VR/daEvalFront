import { Pipe, PipeTransform } from '@angular/core';
import { Formation } from '../_models/formation';
import { FormationService } from '../_services/formation.service';

@Pipe({
  name: 'formation'
})
export class FormationPipe implements PipeTransform {

  constructor(private formationService:FormationService){
    this.getFormationList();
  }

  formations!:Formation[];
  transform(value: number): string|undefined {
    return this.formations.find((f)=>f.id==value)?.titre
  }

  getFormationList(){
    this.formations = this.formationService.Formations;
  }
}
