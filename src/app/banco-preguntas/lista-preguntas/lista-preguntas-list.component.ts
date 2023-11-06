import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalPreguntasSaveComponent } from '../modal-preguntas-save/modal-preguntas-save.component';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { Pregunta } from '../pregunta';
import { Respuesta } from '../respuesta';
import { BancoPreguntas } from '../banco-preguntas';
import { ModalRespuestasSaveComponent } from '../modal-respuestas-save/modal-respuestas-save.component';


@Component({
  selector: 'app-lista-preguntas-list',
  templateUrl: './lista-preguntas-list.component.html',
  styleUrls: ['./lista-preguntas-list.component.css']
})

export class ListaPreguntasListComponent implements OnInit {

  listaPreguntasBanco: Array<Pregunta> = [];
  @Input({ required: true }) bancoPreguntas!: BancoPreguntas;


  constructor(private  bancoPreguntasService: BancoPreguntasService, private router: Router, private toastr: ToastrService, public dialog: MatDialog ) { }

  getListaPreguntasBanco(): void {
    if (this.bancoPreguntas !== undefined && this.bancoPreguntas != null){
      this.bancoPreguntasService.getListaPreguntasBanco(this.bancoPreguntas.id!).subscribe((listaPreguntasBanco): void => {
        this.listaPreguntasBanco = listaPreguntasBanco;
      });
    }
  }
  agregarPregunta(): void {
      const dialogRef = this.dialog.open(ModalPreguntasSaveComponent, {
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(textoPregunta => {
        console.log(textoPregunta);
        if (textoPregunta !== undefined && textoPregunta !== null && textoPregunta !== ""){
          let pregunta = new Pregunta(null, textoPregunta, this.bancoPreguntas, []);
          this.bancoPreguntasService.createPregunta(pregunta).subscribe(response=>{
            this.getListaPreguntasBanco();
          });
        }
      });
  }

  agregarRespuesta(pregunta: Pregunta): void {
    const dialogRef = this.dialog.open(ModalRespuestasSaveComponent, {
      width: '600px',
      data:{
        pregunta: pregunta,
      }
    });

    dialogRef.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta !== undefined && respuesta !== null){
        respuesta.pregunta = pregunta;
        this.bancoPreguntasService.createRespuesta(respuesta).subscribe(response=>{
          this.getListaPreguntasBanco();
        });
      }
    });
  }

  modificarRespuesta(pregunta: Pregunta, respuesta: Respuesta): void {
    const dialogRef = this.dialog.open(ModalRespuestasSaveComponent, {
      width: '600px',
      data:{
        pregunta: pregunta,
        respuesta: respuesta,
      }
    });

    dialogRef.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta !== undefined && respuesta !== null){
        pregunta.respuestas = [];
        respuesta.pregunta = pregunta;
        this.bancoPreguntasService.createRespuesta(respuesta).subscribe(response=>{
          this.getListaPreguntasBanco();
        });
      }
    });
  }
  ngOnInit(): void {
    this.getListaPreguntasBanco();
  }

}
