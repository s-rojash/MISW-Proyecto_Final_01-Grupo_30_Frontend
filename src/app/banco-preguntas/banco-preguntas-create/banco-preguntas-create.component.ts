import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';



@Component({
  selector: 'app-banco-preguntas-create',
  templateUrl: './banco-preguntas-create.component.html',
  styleUrls: ['./banco-preguntas-create.component.css']
})
export class BancoPreguntasCreateComponent implements OnInit {

  projectForm!: FormGroup;
  valueNames = '';
  valueDescription = '';
  bancoPreguntas:Array<BancoPreguntas>=[];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private bancoPreguntasService: BancoPreguntasService) { }

    createBancoPreguntas(bancoPreguntas: BancoPreguntas):void{
      this.bancoPreguntasService.createBancoPreguntas(bancoPreguntas).subscribe(response=>{
            this.bancoPreguntasService.bancoPreguntasCreated();
            this.toastr.success("Confirmation", "Project created")
              this.projectForm.reset();
      });
    }
    cancelCreation():void{this.projectForm.reset();}

    ngOnInit():void {
      this.projectForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(2)]],
        descripcion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      });
    }

}
