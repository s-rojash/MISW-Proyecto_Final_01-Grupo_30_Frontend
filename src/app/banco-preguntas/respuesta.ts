import { Pregunta } from "./pregunta";


export class Respuesta {
  id: number;
  respuesta: string;
  estado: string;
  puntos: number;
  pregunta: Pregunta | null;

    constructor(id: number,respuesta: string,estado: string, pregunta: Pregunta, puntos: number) {
      this.id = id;
      this.respuesta = respuesta;
      this.puntos = puntos;
      this.estado = estado;
      this.pregunta = pregunta;
    }
   }
