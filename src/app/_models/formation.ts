export class Formation {
    id:number;
    titre:string;
    duree:number;
    slug:string;
    objectifsPedagogiques:string;
    version:number;

    constructor(){
        this.id=0;
        this.version=0;
        this.duree=0;
        this.titre="";
        this.slug="";
        this.objectifsPedagogiques="";
    }
}
