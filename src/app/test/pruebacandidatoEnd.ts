import { Prueba } from "../banco-preguntas/prueba";

export class PruebacandidatoEnd {
  id: number;
  idCandidato: number;
  prueba: {id:number};
  puntaje: number;
  estado: string;

  constructor(id: number, idCandidato: number, prueba: Prueba, puntaje: number, estado: string){
    this.id = id;
    this.idCandidato = idCandidato;
    this.prueba = prueba;
    this.puntaje = puntaje;
    this.estado = estado;
  }
}
