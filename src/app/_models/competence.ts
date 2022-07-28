export class Competence {

    id:number;
    titre:string;
    description:string;
    blocCompetencesId:number;
    version:number;

    constructor(){
        this.id=0;
        this.titre="";
        this.description="";
        this.blocCompetencesId=0;
        this.version=0;
    }

}
