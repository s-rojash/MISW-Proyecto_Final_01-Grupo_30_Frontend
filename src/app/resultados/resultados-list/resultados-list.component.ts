import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/team/team';
import { ResultadosService } from '../resultados.service';
import { TeamService } from 'src/app/team/team.service';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados-list.component.html',
  styleUrls: ['./resultados-list.component.css']
})
export class ResultadosListComponent implements OnInit {


  listaEquipos!: Team[];

  constructor(private resultadoService: ResultadosService, private teamService : TeamService) { }


  getListaTeams(): void {
    this.teamService.getTeams().subscribe((listaEquipos): void => {
      this.listaEquipos = listaEquipos;
    });
  }
   
  ngOnInit(): void {
    this.getListaTeams();
  }

}
