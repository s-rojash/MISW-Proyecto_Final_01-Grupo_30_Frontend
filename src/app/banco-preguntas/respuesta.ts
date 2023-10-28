

export class Respuesta {
  idRespuesta: number;
  respuesta: string;
  estado: string;
  idPregunta: number;

    constructor(idRespuesta: number,respuesta: string,estado: string, idPregunta: number) {
      this.idRespuesta = idRespuesta;
      this.respuesta = respuesta;
      this.estado = estado;
      this.idPregunta = idPregunta;
    }
   }
