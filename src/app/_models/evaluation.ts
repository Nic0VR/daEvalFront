export class Evaluation {
    epreuveId:number;
    note:number;
    etudiantId:number;
    moyennePromo?:number;
    epreuveTitre?:string;
    
    constructor(){
        this.epreuveId=0;
        this.note=0;
        this.etudiantId=0;
    }
}
