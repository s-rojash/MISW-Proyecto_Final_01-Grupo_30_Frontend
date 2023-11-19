import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaPrueba } from 'src/app/agendapruebas/agenda-prueba';
import { AgendaPruebaService } from 'src/app/agendapruebas/agenda-prueba.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Candidato } from '../candidato';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-evaluacion-desempeno-create',
  templateUrl: './evaluacion-desempeno-create.component.html',
  styleUrls: ['./evaluacion-desempeno-create.component.css']
})
export class EvaluacionDesempenoCreateComponent implements OnInit {

  agendaPruebaForm!: FormGroup;
  listaPruebas!: Prueba[];
  listaCandidatos!: Candidato[];
  private routeSub: Subscription | undefined;
  private agendaPruebasId!: number | null;
  agendaPruebas!: AgendaPrueba;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private agendaPruebaService: AgendaPruebaService,
    private bancoPreguntasService: BancoPreguntasService,
    private route: ActivatedRoute,
    private router: Router) { }

    createAgendaPrueba(agendaPrueba: AgendaPrueba):void{
      agendaPrueba.estado = "Agendada";
      if (this.agendaPruebasId !== undefined && this.agendaPruebaForm !== null){
        agendaPrueba.id = this.agendaPruebasId!;
      }
      console.log("Guardando");
      this.agendaPruebaService.saveListaAgendaPrueba(agendaPrueba).subscribe(response=>{
        this.toastr.success("Confirmation", "Test schedule created");
      });
    }
    getListaPruebas(): void {
      this.bancoPreguntasService.getListaPruebas().subscribe((listaPruebas) => {
        this.listaPruebas = listaPruebas;
      });
    }

    getListaCandidatos(): void {
      this.agendaPruebaService.getListaCandidatos().subscribe((listaCandidatos: Candidato[]) => {
        this.listaCandidatos = listaCandidatos;
      });
    }

    ngOnInit():void {
      this.routeSub = this.route.params.subscribe(params => {
        this.agendaPruebasId = Number(params['id?']);
        if (this.agendaPruebasId !== null && !isNaN(this.agendaPruebasId)){
          this.agendaPruebaService.getAgendaPrueba(this.agendaPruebasId).subscribe((agendaPruebas: AgendaPrueba) =>{
            this.agendaPruebas = agendaPruebas;
            this.agendaPruebaForm = this.formBuilder.group({
              idPrueba: [agendaPruebas.idPrueba, [Validators.required, Validators.minLength(2)]],
              idCandidato: [agendaPruebas.idCandidato, [Validators.required, Validators.minLength(2)]],
              fecha: [agendaPruebas.fecha, [Validators.required]],
            });
          })
        }
      });

      this.getListaPruebas();
      this.getListaCandidatos();
      this.agendaPruebaForm = this.formBuilder.group({
        idPrueba: ["", [Validators.required]],
        idCandidato: ["", [Validators.required]],
        fecha: ["", [Validators.required]],
      });
    }

}
