import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { BancoPreguntas } from 'src/app/banco-preguntas/banco-preguntas';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { Pregunta } from '../pregunta';
import { Respuesta } from '../respuesta';
import { PresentarPrueba } from '../presentar-prueba';
import { ToastrService } from 'ngx-toastr';
import { catchError, concatMap, from, of, toArray } from 'rxjs';
import { Pruebacandidato } from '../pruebacandidato';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebacandidatoEnd } from '../pruebacandidatoEnd';

@Component({
  selector: 'app-test-take',
  templateUrl: './test-take.component.html',
  styleUrls: ['./test-take.component.css']
})
export class TestTakeComponent implements OnInit {

  step = 0;
  listaBancosPreguntas: Array<BancoPreguntas> = [];
  listaPreguntas: Array<Pregunta> = [];
  listaSeleccion: Array<Array<Pregunta>> = [];
  listaRespuestas: Array<Respuesta> = [];
  listaSpreguntas: Array<Array<string>> = [];
  pruebacandidato!:Pruebacandidato;
  prueba!: Prueba;
  index = 0;
  idPreguntaSeleccionada: string = "";
  idPreguntaContestada: string = "";
  preguntaSeleccionada:string = "";
  firstvalue:boolean = true;
  idaccordion = 0;
  selectedValue: Respuesta | null = null;
  idPruebaCandidato: number = 0;

  constructor(private testService: TestService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  getPruebacandidatoById(idPruebacandidato:number){
    this.listaBancosPreguntas.length = 0;
    this.listaSeleccion.length = 0;
    this.listaSpreguntas.length = 0;

    this.testService.getPruebacandidatoById(idPruebacandidato).subscribe({
      next: (pruebacandidatop) => {
        console.log(pruebacandidatop);
        this.pruebacandidato = pruebacandidatop;
        this.prueba = pruebacandidatop.prueba;
        this.listaBancosPreguntas = pruebacandidatop.prueba.bancosPreguntas;
        this.listaBancosPreguntas.sort((a, b) => {
          return (a?.id ?? 0) - (b?.id ?? 0);
        });
        this.getsavedTest(this.prueba.id);
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  seleccionarPregunta(idinlist:number, id:number, idpregunta: number, nombre: string): void{
    this.idaccordion = id;
    this.idPreguntaSeleccionada = idpregunta.toString();
    this.preguntaSeleccionada = nombre;
    this.listaRespuestas = this.listaSeleccion[id][idinlist].respuestas;
  }

  isButtonDisabled():boolean{
    if(this.selectedValue === null){
      return true;
    }
    else{
      return false;
    }
  }

  saveResponse(){
    const presentarPrueba: PresentarPrueba = {id: 0, idPruebaCandidato: this.idPruebaCandidato, idCandidato: 0, idPrueba: this.prueba.id, idPregunta: Number(this.idPreguntaSeleccionada), idRespuesta: this.selectedValue?.id, fecha:null};
    this.testService.saveRespuesta(presentarPrueba).subscribe(presentarPruebap => {
      console.info("La presentacion de la prueba fue creada: ", presentarPruebap);
      this.firstvalue = true;
      this.listaSeleccion.length = 0;
      this.getsavedTest(presentarPruebap.idPrueba);

      this.toastr.success("Confirmación", "Respuesta Guardada.");
    });
  }

  radioChange(event: any) {
    this.selectedValue = event.value;
    console.log(this.selectedValue);
  }

  getsavedTest(idPrueba: number){
    this.testService.getSavedRespuestas(idPrueba).subscribe({
      next: (respuestasGuardadas) => {

        for(let respuestaGuardada of respuestasGuardadas){
          if(respuestaGuardada.idPruebaCandidato == this.idPruebaCandidato){
            this.idPreguntaContestada = this.idPreguntaContestada + ", " + respuestaGuardada.idPregunta;
            console.log("entro al if de idPreguntaContestada");
          }
        }

        from(this.listaBancosPreguntas).pipe(
          concatMap(bancosPreguntas =>
            this.testService.getPreguntas(bancosPreguntas.id).pipe(
              catchError(error => {
                // Handle errors for a specific request
                console.error(`Error fetching data for ${bancosPreguntas.id}:`, error);
                return of([]); // Continue with an empty array in case of an error
              })
            )
          ),
          toArray()
        ).subscribe((preguntasArray: any[]) => {
          // preguntasArray is an array of responses in the same order as this.listaBancosPreguntas

          preguntasArray.forEach((preguntasp, index) => {
            // Process preguntasp for the corresponding bancosPreguntas[index]

            for (let pregunta of preguntasp) {
              if (this.firstvalue && !this.idPreguntaContestada.match("\\b" + pregunta.id.toString() + "\\b")) {
                this.idPreguntaSeleccionada = pregunta.id.toString();
                this.preguntaSeleccionada = pregunta.pregunta;
                this.firstvalue = false;
                this.listaRespuestas = pregunta.respuestas;
                this.idaccordion = this.listaSeleccion.length;
              }
            }

            let listaindex: string[] = [];

            for (let i = 1; i <= preguntasp.length; i++) {
              listaindex.push(i.toString());
            }

            // Add preguntasp to this.listaSeleccion
            this.listaSeleccion.push(preguntasp);

            // Add listaindex to this.listaSpreguntas
            this.listaSpreguntas.push(listaindex);
          });
        });
      }
    });
  }

  isButtonEndDisabled():boolean{
    if(this.listaSeleccion.length + 1 != this.idPreguntaContestada.split(",").length - 1){
      return true;
    }
    else{
      return false;
    }
  }

  saveEndTest(){
    const pruebacandidatoEnd: PruebacandidatoEnd = {
      id: this.pruebacandidato.id,
      idCandidato: this.pruebacandidato.idCandidato,
      prueba: {id: this.pruebacandidato.prueba.id},
      puntaje: this.pruebacandidato.puntaje,
      estado: this.pruebacandidato.estado
    };

    this.testService.saveEndTest(pruebacandidatoEnd);
    this.toastr.success("Confirmación", "Se envio la prueba para su calificación.");
        this.router.navigate(['/principal']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPruebaCandidato = params['id'];
      this.getPruebacandidatoById(this.idPruebaCandidato);
    });
  }
}
