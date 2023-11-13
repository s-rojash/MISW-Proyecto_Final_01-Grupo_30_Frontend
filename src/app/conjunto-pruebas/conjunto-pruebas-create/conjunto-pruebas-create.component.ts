import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BancoPreguntas } from 'src/app/banco-preguntas/banco-preguntas';
import { Conjuntoprueba } from '../conjuntoprueba';
import { ConjuntoPruebasService } from '../conjunto-pruebas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conjunto-pruebas-create',
  templateUrl: './conjunto-pruebas-create.component.html',
  styleUrls: ['./conjunto-pruebas-create.component.css']
})
export class ConjuntoPruebasCreateComponent implements OnInit {
  listaBancopreguntas: BancoPreguntas[] = [];
  conjuntoPruebasForm! : FormGroup;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private conjuntopruebasService: ConjuntoPruebasService
    ) { }

    createConjuntoPruebas (conjuntopruebas: Conjuntoprueba):void{
      
      const selectedPreguntas = this.listaBancopreguntas
      .filter((pregunta) => pregunta.selected)
      .map((pregunta) => ({ id: pregunta.id }))
      .filter((obj): obj is { id: number } => obj.id !== null);


      const conjuntoprueba: Conjuntoprueba = {
        id: null,
        nombre: this.conjuntoPruebasForm.get('nombre')!.value,
        descripcion: this.conjuntoPruebasForm.get('descripcion')!.value,
        bancoPreguntas: selectedPreguntas,
      };



      console.log("el objeto a crear",conjuntoprueba);

      this.conjuntopruebasService.createConjuntoPruebas(conjuntoprueba).subscribe(response=>{
        this.toastr.success("Confirmation", "Test Group created");
    
       this.conjuntoPruebasForm.reset();
         });
    }

  
    selectBancoPregunta(bancoPregunta: BancoPreguntas): void {
      console.log(bancoPregunta);
      bancoPregunta.selected = !bancoPregunta.selected;

       this.conjuntoPruebasForm.patchValue({
        bancopregunta: bancoPregunta
      });
    }
    

  ngOnInit():void  {
    this.conjuntoPruebasForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required]],
      bancopregunta: [null, [Validators.required]]  
    });
  
    this.conjuntopruebasService.getAllBancoPreguntas().subscribe(listaBancopreguntas => {
      this.listaBancopreguntas = listaBancopreguntas;
      console.log("listaBancopreguntas",  this.listaBancopreguntas );
    });
    

  }

}
