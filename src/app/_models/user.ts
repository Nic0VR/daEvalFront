export class User {

  id:number;
  nom:string;
  prenom:string;
  email:string;
  motDePasse:string;
  active:boolean;
  role:string;
  version:number;
  imagePath:string;

  constructor(){
    this.id=0;
    this.nom= '';
    this.prenom = '';
    this.email= '';
    this.motDePasse='';
    this.active=false;
    this.role='';
    this.version=0;
    this.imagePath='';

  }
 

}
