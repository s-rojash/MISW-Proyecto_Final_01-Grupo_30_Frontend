import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/team/team';
import { ResultadosService } from '../resultados.service';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';
import { Resultados } from '../resultados';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados-list.component.html',
  styleUrls: ['./resultados-list.component.css']
})


export class ResultadosListComponent implements OnInit {
  listaCandidatos: Signupapplicant[] =[];
  listaResultados: Resultados[] =[];
  candidatosDeLaPruebaSeleccionada: Signupapplicant[] = [];
  resultadosConCandidatos: any[] = [];
  pruebaSeleccionada: any; 

  constructor(private resultadoService: ResultadosService, 
              private applicantService:SignupService) { }



   
  ngOnInit(): void {
  

      this.resultadoService.getAllResults().subscribe(
      (listaResultados) => {
        console.log('Lista de resultados:', listaResultados);
        this.listaResultados = listaResultados;

        // Agrupamos los resultados por prueba
        this.resultadosConCandidatos = this.groupResultsByPrueba(listaResultados);
        console.log("this.resultadosConCandidatos",this.resultadosConCandidatos)
      
      },
      (error) => {
        console.error('Error al obtener resultados:', error);
      });


    this.applicantService.getApplicant().subscribe(listaCandidatos => {
      console.log('Lista de candidatos:', listaCandidatos);
          this.listaCandidatos = listaCandidatos;
        },
        (error) => {
          console.error('Error al obtener resultados:', error);
        });


      
  }

  mostrarCandidatosDeLaPrueba(resultado: Resultados): void {
    this.pruebaSeleccionada = resultado;

    
    console.log ("pruebaSeleccionada",this.pruebaSeleccionada)
    this.candidatosDeLaPruebaSeleccionada = this.listaCandidatos.filter(
      (candidato) => candidato.id === resultado.idCandidato
    );
  }

  private groupResultsByPrueba(resultados: Resultados[], state?: any[]): any[] {
    const groupedResults: any[] = [];

    resultados.forEach((resultado) => {
      const existingGroup = groupedResults.find((group) => group.prueba.id === resultado.prueba.id);
      if (existingGroup) {
        const candidato = this.getCandidatoById(resultado.idCandidato);
        existingGroup.candidatos.push({
          candidato,
          puntaje: resultado.puntaje,
          estado: resultado.estado,
          fechaPresentacion: resultado.fechaPresentacion
        });
      } else {
        const newGroup = {
          prueba: resultado.prueba,
          candidatos: [{
            candidato: this.getCandidatoById(resultado.idCandidato),
            puntaje: resultado.puntaje,
            estado: resultado.estado,
            fechaPresentacion: resultado.fechaPresentacion
          }]
        };
        groupedResults.push(newGroup);
      }
    });
    console.log("groupedResults",groupedResults)
    return groupedResults;
  }

 private getCandidatoById(candidatoId: number): Signupapplicant | undefined {
  return this.listaCandidatos?.find((candidato) => candidato.id === candidatoId);
}

}
