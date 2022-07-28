export class Epreuve {

    id:number;
    titre:string;
    type:string;
    blocCompetencesId:number;
    description:string;
    version:number;

    constructor(){
        this.id=0;
        this.version=0;
        this.blocCompetencesId=0;
        this.titre="";
        this.description="";
        this.type="";
    }

}
