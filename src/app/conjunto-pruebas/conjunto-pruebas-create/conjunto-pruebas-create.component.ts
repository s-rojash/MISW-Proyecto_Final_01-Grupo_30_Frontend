import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BancoPreguntas } from 'src/app/banco-preguntas/banco-preguntas';
import { Conjuntoprueba } from '../conjuntoprueba';
import { ConjuntoPruebasService } from '../conjunto-pruebas.service';

@Component({
  selector: 'app-conjunto-pruebas-create',
  templateUrl: './conjunto-pruebas-create.component.html',
  styleUrls: ['./conjunto-pruebas-create.component.css']
})
export class ConjuntoPruebasCreateComponent implements OnInit {
  listaBancosPreguntas: Array<BancoPreguntas> =[];
  conjuntoPruebasForm! : FormGroup;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private conjuntopruebasService: ConjuntoPruebasService,
    ) { }

    createConjuntoPruebas (conjuntopruebas: Conjuntoprueba):void{
   
      this.conjuntopruebasService.createConjuntoPruebas(conjuntopruebas).subscribe(response=>{
        this.toastr.success("Confirmation", "Test Group created");
       // this.router.navigateByUrl('/banco-preguntas/create/' + response.id)
      });
    }

  ngOnInit():void  {
    
  }

}
