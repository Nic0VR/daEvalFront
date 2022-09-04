import { Pipe, PipeTransform } from '@angular/core';
import { Formateur } from '../_models/formateur';
import { UserService } from '../_services/user.service';

@Pipe({
  name: 'formateur'
})
export class FormateurPipe implements PipeTransform {

  formateurs!:Formateur[];

  constructor(private userService:UserService){
    this.getFormateurs();
  }

  transform(value: number): string {
    let formateur:Formateur | undefined= this.formateurs.find((f)=>f.id==value);
    if(formateur){
      let result = formateur.nom+" "+formateur.prenom;
      return result;
    }else{
      return "no data"
    }
  }

  getFormateurs(){
    this.formateurs=this.userService.Formateurs;
  }

}
