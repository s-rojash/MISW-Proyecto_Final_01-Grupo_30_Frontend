import { Evaluationquestionbank } from "./evaluationquestionbank";

export class Evaluationtest {
  id: number;
  nombre: string;
  descripcion: string;
  bancosPreguntas: Evaluationquestionbank[];

  constructor(id: number, nombre: string, descripcion: string, bancosPreguntas: Evaluationquestionbank[]){
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.bancosPreguntas = bancosPreguntas;
  }
}
