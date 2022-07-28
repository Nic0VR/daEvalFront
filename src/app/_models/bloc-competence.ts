import { Competence } from "./competence";

export class BlocCompetence {

    id:number;
    titre:string;
    description:string;
    titreProfessionnelId:number;
    version:number;
    competences?:Competence[];
    constructor(){
        this.id=0;
        this.titre="";
        this.description="";
        this.titreProfessionnelId=0;
        this.version=0;
    }


}
