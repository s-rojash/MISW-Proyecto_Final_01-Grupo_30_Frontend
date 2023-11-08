import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgendaPrueba } from '../agenda-prueba';
import { AgendaPruebaService } from '../agenda-prueba.service';

@Component({
  selector: 'app-agenda-pruebas-list',
  templateUrl: './agenda-pruebas-list.component.html',
  styleUrls: ['./agenda-pruebas-list.component.css']
})
export class AgendaPruebasListComponent implements OnInit {

  listaAgendaPruebas!: AgendaPrueba[];
  constructor(private agendaPruebaService: AgendaPruebaService, private router: Router, private toastr: ToastrService ) { }


  getListaPreguntas(): void {
    this.agendaPruebaService.getListaAgendaPrueba().subscribe((listaAgendaPruebas): void => {
      this.listaAgendaPruebas = listaAgendaPruebas;
    });
  }


  ngOnInit(): void {
    this.getListaPreguntas();
  }

}
