import { Formation } from "./formation";
import { Promotion } from "./promotion";

export class Intervention {

    id:number;
    version:number;
    dateDebut:string;
    dateFin:string;
    formationId:number;
    promotionId:number;
    formateurId:number;
    formateurNomComplet?:string;
    promotion?:Promotion;
    formation?:Formation;
    
    constructor(){
        this.id=0;
        this.version=0;
        this.dateDebut="";
        this.dateFin="";
        this.formateurId=0;
        this.formationId=0;
        this.promotionId=0;
    }
}
