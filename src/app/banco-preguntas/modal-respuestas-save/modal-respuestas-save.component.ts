import { Component, Input, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';
import { Categoria } from '../categoria';
import { Subscription } from 'rxjs';
import { Pregunta } from '../pregunta';
import { Respuesta } from '../respuesta';


@Component({
  selector: 'app-modal-respuestas-save',
  templateUrl: './modal-respuestas-save.component.html',
  styleUrls: ['./modal-respuestas-save.component.css']
})
export class ModalRespuestasSaveComponent implements OnInit {

  respuestaForm!: FormGroup;
  respuesta!: Respuesta;
  @Input() pregunta!: Pregunta;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalRespuestasSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.respuesta = data.respuesta;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    retornarRespuesta(): void{
      if (this.respuesta === undefined || this.respuesta === null){
        this.respuesta = new Respuesta(0, this.respuestaForm.get("respuesta")?.value, this.respuestaForm.get("estado")?.value === true ? "true": "false", this.pregunta, this.respuestaForm.get("puntos")?.value )
      } else {
        this.respuesta.respuesta = this.respuestaForm.get("respuesta")?.value;
        this.respuesta.puntos = this.respuestaForm.get("puntos")?.value;
        this.respuesta.estado = this.respuestaForm.get("estado")?.value === true ? "true": "false";
      }
      this.dialogRef.close(this.respuesta);
    }

    ngOnInit():void {
      console.log("Respuesta", this.respuesta);
      this.respuestaForm = this.formBuilder.group({
        respuesta: [this.respuesta?.respuesta, [Validators.required, Validators.minLength(1)]],
        puntos: [this.respuesta?.puntos, [Validators.required, Validators.minLength(1)]],
        estado: [this.respuesta?.estado, []],
      });
    }
}
