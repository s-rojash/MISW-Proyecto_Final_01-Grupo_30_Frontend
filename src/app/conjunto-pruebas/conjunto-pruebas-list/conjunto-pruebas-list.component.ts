import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Conjuntoprueba  } from '../conjuntoprueba';
import { ConjuntoPruebasService } from '../conjunto-pruebas.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => item.nombre.toLowerCase().includes(searchText));
  }
}


@Component({
  selector: 'app-conjunto-pruebas-list',
  templateUrl: './conjunto-pruebas-list.component.html',
  styleUrls: ['./conjunto-pruebas-list.component.css'],
})
export class ConjuntoPruebasListComponent implements OnInit {
  originalConjuntoPruebas: Conjuntoprueba[] = []; 
  conjuntopruebas: Conjuntoprueba[] = [];
  conjuntopruebasMock: Conjuntoprueba[] = []; 
  filtro: string = '';
  selectedConjunto: Conjuntoprueba | undefined;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private conjuntopruebasService :ConjuntoPruebasService) { }

    ngOnInit(): void {
      const conjuntoPruebas$ = this.conjuntopruebasService.getAllConjuntoPruebas();
      
      if (conjuntoPruebas$) {
        conjuntoPruebas$.subscribe(
          (conjuntopruebas) => {
            this.conjuntopruebas = conjuntopruebas;
            this.originalConjuntoPruebas = [...this.conjuntopruebas];
          },
          (error) => {
            console.error('Error fetching conjunto pruebas', error);
          }
        );
      } else {
        console.error('Observable getAllConjuntoPruebas is undefined');
      }
    }
  
  seleccionarConjunto(conjunto: Conjuntoprueba): void {
    console.log('Conjunto seleccionado:', conjunto);
    this.selectedConjunto = conjunto;
  }
  
  deseleccionarConjunto(): void {
    this.selectedConjunto = undefined;
  }

  displayConjunto(conjunto: Conjuntoprueba): string {
    return conjunto ? conjunto.nombre : '';
  }

filtrarLista() {
    if (this.filtro === '') {
      this.conjuntopruebas = [...this.originalConjuntoPruebas];
    } else {
      this.conjuntopruebas = this.originalConjuntoPruebas.filter((conjunto) =>
        conjunto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  }

}
