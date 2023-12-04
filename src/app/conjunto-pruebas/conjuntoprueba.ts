import { BancoPreguntas } from "../banco-preguntas/banco-preguntas";

export class Conjuntoprueba {
  id: number | null;
  bancosPreguntas: BancoPreguntas[] | null;
  nombre: string;
  descripcion: string;

  constructor(id: number | null, nombre: string, descripcion: string, bancosPreguntas: BancoPreguntas[]) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.bancosPreguntas = bancosPreguntas;
  }
}
