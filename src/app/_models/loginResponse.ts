export class LoginResponse {

    id:number;
    nom:string;
    prenom:string;
    email:string;
    token?:string;
    typeUser?:string;
    constructor(){
      this.id = 0;
      this.nom = '';
      this.prenom = '';
      this.email = '';
    }
}
