import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PruebasAgendadasService } from '../pruebas-agendadas.service';
import { Router } from '@angular/router';
import { PruebaAgendada } from '../prueba-agendada';

@Component({
  selector: 'app-pruebas-agendadas-list',
  templateUrl: './pruebas-agendadas-list.component.html',
  styleUrls: ['./pruebas-agendadas-list.component.css']
})
export class PruebasAgendadasListComponent implements OnInit {
  listaPruebas: Array<PruebaAgendada> = [];

  constructor(private  pruebaAgendadaService: PruebasAgendadasService, private router: Router, private toastr: ToastrService ) { }

  getListaPruebas(): void {
    this.pruebaAgendadaService.listarPruebasAsignadas(4).subscribe((listaPruebas) => {
      this.listaPruebas = listaPruebas;
    });
  }
  ngOnInit(): void {
    this.getListaPruebas();
  }

}
