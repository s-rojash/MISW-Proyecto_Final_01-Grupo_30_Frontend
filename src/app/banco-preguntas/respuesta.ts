import { Pregunta } from "./pregunta";


export class Respuesta {
  idRespuesta: number;
  respuesta: string;
  estado: string;
  puntos: Number;
  pregunta: Pregunta;

    constructor(idRespuesta: number,respuesta: string,estado: string, pregunta: Pregunta, puntos: number) {
      this.idRespuesta = idRespuesta;
      this.respuesta = respuesta;
      this.puntos = puntos;
      this.estado = estado;
      this.pregunta = pregunta;
    }
   }
