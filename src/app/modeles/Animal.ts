export class Animal {
    espece: string;
    age: number;
    couleur: string;
    [key:string]:String|number|null|boolean
  
    constructor(espece: string, age: number, couleur: string) {
      this.espece = espece;
      this.age = age;
      this.couleur = couleur;
    }
  }