import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';

@Component({
  selector: 'app-banco-preguntas-list',
  templateUrl: './banco-preguntas-list.component.html',
  styleUrls: ['./banco-preguntas-list.component.css']
})
export class BancoPreguntasListComponent implements OnInit {

  listaBancosPreguntas: Array<BancoPreguntas> = [];
  idCategoriaSeleccionada: number | null = null;
  nombreCategoriaSeleccionada: string | null = null;


  constructor(private  bancoPreguntasService: BancoPreguntasService, private router: Router, private toastr: ToastrService ) { }

  categoriaSeleccionada(datosCategoria: {idCategoriaSeleccionada: number, nombreCategoriaSeleccionada: string}){
    this.idCategoriaSeleccionada = datosCategoria.idCategoriaSeleccionada;
    this.nombreCategoriaSeleccionada = datosCategoria.nombreCategoriaSeleccionada;
    this.getListaBancoPreguntas();
  }

  getListaBancoPreguntas(): void {
    if (this.idCategoriaSeleccionada !== null){
      this.bancoPreguntasService.getListaBancosPreguntas(this.idCategoriaSeleccionada).subscribe((listaBancosPreguntas): void => {
        this.listaBancosPreguntas = listaBancosPreguntas;
      });
    }
  }


  ngOnInit(): void {
    this.getListaBancoPreguntas();
    // this.bancoPreguntasService.projectCreated$.subscribe(() => {
    //   // Actualizar la lista de cuando se crea un banco de preguntas nuevo
    //   this.getListaBancoPreguntas();
    // });

  }

}
