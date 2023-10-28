import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';
import { Categoria } from '../categoria';



@Component({
  selector: 'app-banco-preguntas-create',
  templateUrl: './banco-preguntas-create.component.html',
  styleUrls: ['./banco-preguntas-create.component.css']
})
export class BancoPreguntasCreateComponent implements OnInit {

  bancoPreguntasForm!: FormGroup;
  valueNames = '';
  valueDescription = '';
  listaCategorias: Array<Categoria> = [];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private bancoPreguntasService: BancoPreguntasService) { }

    createBancoPreguntas(bancoPreguntas: BancoPreguntas):void{
      this.bancoPreguntasService.createBancoPreguntas(bancoPreguntas).subscribe(response=>{
            this.bancoPreguntasService.bancoPreguntasCreated();
            this.toastr.success("Confirmation", "Project created")
              this.bancoPreguntasForm.reset();
      });
    }
    cancelCreation():void{this.bancoPreguntasForm.reset();}
    getListaCategorias(): void {
      this.bancoPreguntasService.getCategorias().subscribe((listaCategorias) => {
        this.listaCategorias = listaCategorias;
      });
    }

    ngOnInit():void {
      this.getListaCategorias();
      this.bancoPreguntasForm = this.formBuilder.group({
        tipoBanco: ["", [Validators.required, Validators.minLength(2)]],
        categoria: ["", [Validators.required]],
      });
    }

}
