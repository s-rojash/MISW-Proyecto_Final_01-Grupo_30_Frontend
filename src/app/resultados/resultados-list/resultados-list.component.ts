import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/team/team';
import { ResultadosService } from '../resultados.service';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados-list.component.html',
  styleUrls: ['./resultados-list.component.css']
})


export class ResultadosListComponent implements OnInit {
  listaEquipos!: Team[];
  listaCandidatos!: Signupapplicant[];
  
  constructor(private resultadoService: ResultadosService, 
              private applicantService:SignupService) { }



   
  ngOnInit(): void {
    this.applicantService.getApplicant().subscribe(listaCandidatos => {
      this.listaCandidatos = listaCandidatos;
  });
}

}
