import { Etudiant } from "./etudiant";
import { Intervention } from "./intervention";

export class Positionnement {


    id:number;
    version:number;
    etudiantId:number;
    interventionId:number;
    niveauDebutId:number;
    niveauFinId:number;
    codeHexNiveauDebut?:string;
    codeHexNiveauFin?:string;
    intervention?:Intervention;
    etudiant?:Etudiant;
    constructor(){
        this.id=0;
        this.version=0;
        this.etudiantId=0;
        this.interventionId=0;
        this.niveauDebutId=0;
        this.niveauFinId=0;
    }

}
