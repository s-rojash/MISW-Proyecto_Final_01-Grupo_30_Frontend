import { BancoPreguntas } from "./banco-preguntas";

export class Prueba {
  id: number;
  nombre: string;
  descripcion: string;
  bancosPreguntas!: BancoPreguntas[];

    constructor(  id: number, nombre: string,descripcion: string, bancosPreguntas: BancoPreguntas[]) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.bancosPreguntas = bancosPreguntas;
    }
   }
