import { Pipe, PipeTransform } from '@angular/core';
import { Formateur } from '../_models/formateur';
import { Intervention } from '../_models/intervention';
import { InterventionService } from '../_services/intervention.service';
import { UserService } from '../_services/user.service';

@Pipe({
  name: 'intervention'
})
export class InterventionPipe implements PipeTransform {

  interventions!: Intervention[];
  formateurs!: Formateur[];
  constructor(private interventionService: InterventionService,
    private userService: UserService) { 
      this.getIntervsList();
      this.getFormateurs();
    }
  transform(value: number): string {
    let inter: Intervention | undefined = this.interventions.find((i) => i.id == value);
    if (inter) {
      // let res = inter.formateurNomComplet inter.dateDebut +" "+
      let formateur = this.formateurs.find((formateur) => formateur.id == inter?.formateurId)

      if (formateur) {
       let res = formateur.nom+" "+formateur.prenom+" du "+ inter.dateDebut +" au "+inter.dateFin;
        return res;
      }
    }
    return "no data"
  }

  getIntervsList() {
    this.interventions=this.interventionService.Interventions

  }
  getFormateurs() {
    this.formateurs = this.userService.Formateurs;
  }
}
