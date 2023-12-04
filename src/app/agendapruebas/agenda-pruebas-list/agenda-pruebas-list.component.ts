import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AgendaPrueba } from '../agenda-prueba';
import { AgendaPruebaService } from '../agenda-prueba.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';

@Component({
  selector: 'app-agenda-pruebas-list',
  templateUrl: './agenda-pruebas-list.component.html',
  styleUrls: ['./agenda-pruebas-list.component.css']
})
export class AgendaPruebasListComponent implements OnInit {

  listaAgendaPruebas: AgendaPrueba[] = [];
  listacandidatos: Signupapplicant[] = [];
  index = 0;
  constructor(private agendaPruebaService: AgendaPruebaService,

    private router: Router,
    private toastr: ToastrService ) { }


  getListaPreguntas(): void {
    this.agendaPruebaService.getListaAgendaPrueba().subscribe((listaAgendaPruebas): void => {
      for(let agenda of listaAgendaPruebas){
        this.agendaPruebaService.getCandidato(agenda.idCandidato).subscribe((candidatop): void => {
          this.listaAgendaPruebas.push(agenda);
          this.listacandidatos.push(candidatop);
          console.log(this.listacandidatos);
        });
      }
    });
  }


  ngOnInit(): void {
    this.getListaPreguntas();
  }

}
