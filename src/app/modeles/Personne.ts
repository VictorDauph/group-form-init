export class Personne{
    nom:String|null=null;
    prenom:String|null=null;
    age:number|null=null;
    profession:String|null=null;
    //beau:boolean=false;
    [key:string]:String|number|null|boolean
}