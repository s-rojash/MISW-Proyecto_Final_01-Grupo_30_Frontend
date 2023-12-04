import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaPrueba } from 'src/app/agendapruebas/agenda-prueba';
import { AgendaPruebaService } from 'src/app/agendapruebas/agenda-prueba.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Candidato } from '../candidato';
import { Subscription } from 'rxjs';
import { Pregunta } from 'src/app/banco-preguntas/pregunta';
import { ResultadoPrueba } from 'src/app/agendapruebas/resultado-prueba';

@Component({
  selector: 'app-resultados-pruebas-create',
  templateUrl: './resultados-pruebas-create.component.html',
  styleUrls: ['./resultados-pruebas-create.component.css']
})
export class ResultadosPruebasCreateComponent implements OnInit {

  private routeSub: Subscription | undefined;
  private agendaPruebasId!: number | null;
  agendaPruebas!: AgendaPrueba;
  prueba!: Prueba;
  candidato!: Candidato;
  preguntas = new Map<number, Pregunta[]>();
  respuestasSeleccionadas : any = {}; /// El key es el ID de la pregunta

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private agendaPruebaService: AgendaPruebaService,
    private bancoPreguntasService: BancoPreguntasService,
    private route: ActivatedRoute,
    private router: Router) { }

    getPrueba(idPrueba: number): void {
      this.bancoPreguntasService.getPrueba(idPrueba).subscribe((prueba) => {
        this.prueba = prueba;
        for(let bancoPreguntas of this.prueba.bancosPreguntas){
          this.bancoPreguntasService.getListaPreguntasBanco(bancoPreguntas.id??0).subscribe(preguntasBanco =>{
            this.preguntas.set(bancoPreguntas.id ?? 0, preguntasBanco);
            for(let pregunta of preguntasBanco){
              this.respuestasSeleccionadas[pregunta.id!] = 0;
            }
          });
        }
      });
    }
    setRespuesta(idPregunta: number| null, idRespuesta :number | null){
      if (idPregunta != null && idRespuesta != null){
        this.respuestasSeleccionadas[idPregunta]  = idRespuesta;
      }
    }
    getCandidato(idCandidato: number): void {
      this.agendaPruebaService.getCandidato(idCandidato).subscribe((candidato: Candidato) => {
        this.candidato = candidato;
      });
    }

    saveResultados(): void{
      let resultadoPrueba = new ResultadoPrueba(0, this.agendaPruebasId ?? 0, this.respuestasSeleccionadas);
      this.agendaPruebaService.saveResultadoPrueba(resultadoPrueba).subscribe(()=>{
        this.toastr.success("Confirmation", "Results saved");
      });

    }
    ngOnInit():void {
      this.routeSub = this.route.params.subscribe(params => {
        this.agendaPruebasId = Number(params['id?']);
        if (this.agendaPruebasId !== null && !isNaN(this.agendaPruebasId)){
          this.agendaPruebaService.getAgendaPrueba(this.agendaPruebasId).subscribe((agendaPruebas: AgendaPrueba) =>{
            this.agendaPruebas = agendaPruebas;
            if (agendaPruebas) {
              this.getPrueba(agendaPruebas.prueba.id);
              this.getCandidato(agendaPruebas.idCandidato);
            }
          })
        }
      });

    }

}
