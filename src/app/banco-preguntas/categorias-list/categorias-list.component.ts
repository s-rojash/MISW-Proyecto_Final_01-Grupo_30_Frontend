import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { th } from '@faker-js/faker';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {
  listaCategorias: Array<Categoria> = [];
  idCategoriaSeleccionada: number | null = null;

  @Output() categoriaSeleccionada : EventEmitter<{idCategoriaSeleccionada: number, nombreCategoriaSeleccionada: string}> = new EventEmitter();

  constructor(private  bancoPreguntasService: BancoPreguntasService, private router: Router, private toastr: ToastrService ) { }

  seleccionarCategoria(id: number, nombre: string): void{
    this.idCategoriaSeleccionada = id;
    this.categoriaSeleccionada.emit({
      idCategoriaSeleccionada : this.idCategoriaSeleccionada,
      nombreCategoriaSeleccionada : nombre,
    });
  }
  getListaCategorias(): void {
    this.bancoPreguntasService.getCategorias().subscribe((listaCategorias) => {
      this.listaCategorias = listaCategorias;
      /// Emite el evento para hacer que por default la primera categoría se seleccione
      this.seleccionarCategoria(this.listaCategorias[0].id,this.listaCategorias[0].nombre);
    });
  }


  ngOnInit(): void {
    this.getListaCategorias();
  }

}
