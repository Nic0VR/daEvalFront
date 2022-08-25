export class Evaluation {
    id:number;
    epreuveId:number;
    note:number;
    etudiantId:number;
    moyennePromo?:number;
    epreuveTitre?:string;
    etudiantNom?:string;
    etudiantPrenom?:string;
    constructor(){
        this.id=0;
        this.epreuveId=0;
        this.note=0;
        this.etudiantId=0;
    }
}
