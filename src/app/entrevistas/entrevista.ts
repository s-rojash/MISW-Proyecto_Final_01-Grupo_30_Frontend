import { Categoria } from "../banco-preguntas/categoria";

export class Entrevista {
  id: number | null;
  entrevistador:string;
  fecha:Date;
  categoria: Categoria;

  constructor(id: number | null, entrevistador:string, fecha:Date, categoria: Categoria){
    this.id = id;
    this.entrevistador = entrevistador;
    this.fecha = fecha;
    this.categoria = categoria;
  }
}
