import { Evaluationtest } from "./evaluationtest";

export class Evaluation {
  idCandidato: number;
  prueba: Evaluationtest;
  fecha: string;
  puntos: number;
  estado: string;

  constructor(idCandidato: number, prueba: Evaluationtest, fecha: string, puntos: number, estado: string){
    this.idCandidato = idCandidato;
    this.prueba = prueba;
    this.fecha = fecha;
    this.puntos = puntos;
    this.estado = estado;
  }
}
