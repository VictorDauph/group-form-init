import { Component, OnInit } from '@angular/core';
import fakeData from '../../assets/fake-data.json';
import { Personne } from '../modeles/Personne';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormGroupFields } from '../modeles/interface/FormGroupFields';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  //Il doit y'avoir moyen d'améliorer la construction de ce tableau en utilisant un constructor de personnes avec des paramètres optionnels et obligatoires
 data :Personne[] = fakeData.personnes;
 fields:string[] = []
 personnes:Personne[]=[]

 formGroup1:FormGroup= this.fb.group({
  nom:null,
  prenom:null,
  age:null,
  profession:null
 })

 formArray:FormArray<FormGroup<any>>= this.fb.array([this.formGroup1])

   constructor(private fb:FormBuilder){
    //On construit un tableau de personnes typées à partir des données brutes.
    this.data.forEach(
      (personne:Personne)=>{
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
    this.formArray.removeAt(0) ;
    
   }
   
   //construit un formGroup à partir dun FormGroupFields
   buildFormGroup(p:number){
    const formGroupFields = this.getFormControlsFields(p);
    //l'objet formGroupFields permet de construire directement un formGroup
    let form:FormGroup = new FormGroup(formGroupFields);

    this.formArray.push(form)
   }

   getFormControlsFields(p:number){
    //FormGroupFields est un objet constitué dynamiquement qui contient les formsControls issus du modèle sous forme de clés.
    const formGroupFields:FormGroupFields = {};
    for( const field of this.fields){
      //On crée un form control. Son nom est le field extrait du formGroupFields. 
      //Le FormControl a pour valeur par défaut la valeur du champs de l'objet extrait des données json.
      formGroupFields[field]= new FormControl(this.personnes[p][field]);
    }
    return formGroupFields;
   }

   onInputChange(event:any,formGroupIndex:number,field:string){

    this.formArray.controls[formGroupIndex].controls[field].setValue(event.target.value)
    console.log(this.formArray.controls[formGroupIndex].controls[field].value)

   }

   getPersonneByIndex(i:number):FormGroup{

    return this.formArray.controls[i] as FormGroup
   }
}


