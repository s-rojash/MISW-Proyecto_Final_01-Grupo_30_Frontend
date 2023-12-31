import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AgendaPrueba } from 'src/app/agendapruebas/agenda-prueba';
import { AgendaPruebaService } from 'src/app/agendapruebas/agenda-prueba.service';

@Component({
  selector: 'app-evaluacion-desempeno-list',
  templateUrl: './evaluacion-desempeno-list.component.html',
  styleUrls: ['./evaluacion-desempeno-list.component.css']
})
export class EvaluacionDesempenoListComponent implements OnInit {

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
