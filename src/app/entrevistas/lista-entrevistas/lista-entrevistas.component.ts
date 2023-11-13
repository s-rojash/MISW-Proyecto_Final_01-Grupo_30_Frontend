import { Component, OnInit } from '@angular/core';
import { Entrevista } from '../entrevista';

@Component({
  selector: 'app-lista-entrevistas',
  templateUrl: './lista-entrevistas.component.html',
  styleUrls: ['./lista-entrevistas.component.css']
})
export class ListaEntrevistasComponent implements OnInit {

  listaEntrevistas: Array<Entrevista> = [];
  nombreCategoriaSeleccionada: string | null = null;
  selected: Date | null = null;

  constructor() { }

  ngOnInit() {
  }

}
