import { Pipe, PipeTransform } from '@angular/core';
import { Etudiant } from '../_models/etudiant';
import { EtudiantService } from '../_services/etudiant.service';

@Pipe({
  name: 'etudiant'
})
export class EtudiantPipe implements PipeTransform {

  etudiants!:Etudiant[];

  constructor(private etudiantService:EtudiantService){
    this.getEtudiants();
  }

  transform(value: number): string {
    let etudiant:Etudiant|undefined  = this.etudiants.find((e)=> e.id==value);
    if(etudiant){
      let result = etudiant.nom+" "+etudiant.prenom;
      return result;
    }else{
      return "no data"
    }
  }

  getEtudiants(){
    this.etudiants=this.etudiantService.Etudiants;
  }
}
