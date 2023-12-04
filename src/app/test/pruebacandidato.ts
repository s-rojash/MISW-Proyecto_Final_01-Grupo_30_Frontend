import { Prueba } from "../banco-preguntas/prueba";

export class Pruebacandidato {
  id: number;
  idCandidato: number;
  prueba: Prueba;
  puntaje: number;
  estado: string;
  fechaPresentacion: Date;

  constructor(id: number, idCandidato: number, prueba: Prueba, puntaje: number, estado: string, fechaPresentacion: Date){
    this.id = id;
    this.idCandidato = idCandidato;
    this.prueba = prueba;
    this.puntaje = puntaje;
    this.estado = estado;
    this.fechaPresentacion = fechaPresentacion;
  }
}
