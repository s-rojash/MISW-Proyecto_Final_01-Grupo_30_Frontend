import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaPrueba } from '../agenda-prueba';
import { AgendaPruebaService } from '../agenda-prueba.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Candidato } from '../candidato';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda-pruebas-create',
  templateUrl: './agenda-pruebas-create.component.html',
  styleUrls: ['./agenda-pruebas-create.component.css']
})
export class AgendaPruebasCreateComponent implements OnInit {

  agendaPruebaForm!: FormGroup;
  listaPruebas!: Prueba[];
  listaCandidatos!: Candidato[];
  private routeSub: Subscription | undefined;
  agendaPruebasId!: number | null;
  agendaPruebas!: AgendaPrueba;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private agendaPruebaService: AgendaPruebaService,
    private bancoPreguntasService: BancoPreguntasService,
    private route: ActivatedRoute,
    private router: Router) { }

    createAgendaPrueba(agendaPrueba: AgendaPrueba):void{
      agendaPrueba.estado = "Pendiente";
      if (this.agendaPruebasId !== undefined && this.agendaPruebaForm !== null){
        agendaPrueba.id = this.agendaPruebasId!;
      }
      console.log(agendaPrueba);
      console.log("Guardando");
      this.agendaPruebaService.saveListaAgendaPrueba(agendaPrueba).subscribe(response=>{
        this.toastr.success("Confirmation", "Test schedule created");
      });
      this.router.navigate(['/agenda-pruebas/get']);
    }
    getListaPruebas(): void {
      this.bancoPreguntasService.getListaPruebas().subscribe((listaPruebas) => {
        this.listaPruebas = listaPruebas;
      });
    }

    getListaCandidatos(): void {
      this.agendaPruebaService.getListaCandidatos().subscribe((listaCandidatos) => {
        this.listaCandidatos = listaCandidatos;
      });
    }

    ngOnInit():void {
      this.routeSub = this.route.params.subscribe(params => {
        this.agendaPruebasId = Number(params['id?']);
        if (this.agendaPruebasId !== null && !isNaN(this.agendaPruebasId)){
          this.agendaPruebaService.getAgendaPrueba(this.agendaPruebasId).subscribe((agendaPruebas) =>{
            this.agendaPruebas = agendaPruebas;
            this.agendaPruebaForm = this.formBuilder.group({
              idCandidato: [agendaPruebas.idCandidato, [Validators.required]],
              prueba: this.formBuilder.group({
                id: [agendaPruebas.prueba.id, [Validators.required]]
              }),
              fechaPresentacion: [agendaPruebas.fechaPresentacion, [Validators.required]],
            });
          })
        }
      });

      this.getListaPruebas();
      this.getListaCandidatos();
      this.agendaPruebaForm = this.formBuilder.group({
        idCandidato: ["", [Validators.required]],
        prueba: this.formBuilder.group({
          id: ["", [Validators.required]]
        }),
        fechaPresentacion: ["", [Validators.required]],
      });
    }

}
