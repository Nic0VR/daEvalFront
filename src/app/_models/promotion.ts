

export class Promotion {
   id:number;
   dateDebut:Date;
   dateFin: Date;
   titreProfessionnelId:number;
   version:number;
   villeId:number;
   etudiantsId:number[];
   villeNom?:string;
   titreProNom?:string;
   

   constructor(){
    this.id=0;
    this.dateDebut= new Date();
    this.dateFin= new Date();
    this.titreProfessionnelId=0;
    this.version=0;
    this.villeId=0;
    this.etudiantsId=[];
   }
}
