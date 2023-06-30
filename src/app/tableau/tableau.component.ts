import { Component, OnInit } from '@angular/core';
import fakeData from '../../assets/animaux.json';
import { Personne } from '../modeles/Personne';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormGroupFields } from '../modeles/interface/FormGroupFields';
import { Animal } from '../modeles/Animal';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  //Il doit y'avoir moyen d'améliorer la construction de ce tableau en utilisant un constructor de personnes avec des paramètres optionnels et obligatoires
 data :Animal[] = fakeData;
 fields:string[] = []
 personnes:Animal[]=[]
 //form:FormGroup=new FormGroup({});
 formArray:FormGroup[]= [];

   constructor(private fb:FormBuilder){
    //On construit un tableau de personnes typées à partir des données brutes.
    this.data.forEach(
      (personne:Animal)=>{
        this.personnes.push(personne)
      }
    )

       // on extraite le nom des champs à partir d'un objet du tableau fictif'.
       this.fields=Object.keys(this.personnes[0])
       console.log(this.fields);
   }

   ngOnInit(){
    this.buildFormArray()
    
   }

   buildFormArray(){
    for (let p = 0; p<this.personnes.length; p++){
      this.buildFormGroup(p)
    }
    
   }
   
   //construit un formGroup à partir dun FormGroupFields
   buildFormGroup(p:number){
    const formGroupFields = this.getFormControlsFields();
    //l'objet formGroupFields permet de construire directement un formGroup
    let form = new FormGroup(formGroupFields);

    //On applique la valeur liée à l'objet au formcontrol qui le représente.
    for(const field of this.fields){
      form.controls[field].setValue(this.personnes[p][field])   
    }

    this.formArray.push(form);
   }

   getFormControlsFields(){
    //FormGroupFields est un objet constitué dynamiquement qui contient les formsControls issus du modèle sous forme de clés.
    const formGroupFields:FormGroupFields = {};
    for( const field of this.fields){
      formGroupFields[field]= new FormControl();
    }
    return formGroupFields;
   }

   onInputChange(event:any,formGroupIndex:number,field:string){

    this.formArray[formGroupIndex].controls[field].setValue(event.target.value)
    console.log(this.formArray[formGroupIndex].controls[field].value)

   }
}


