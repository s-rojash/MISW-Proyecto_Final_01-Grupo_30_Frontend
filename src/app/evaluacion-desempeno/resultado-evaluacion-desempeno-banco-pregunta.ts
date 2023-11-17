
export class ResultadoEvaluacionDesempenoBancoPregunta {
  id: number;
  idResultadoEvaluacionDesempeno: number;
  idBancoPreguntas: number;
  idPregunta: number;
  idRespuesta: number;
  puntaje: number;

    constructor(id: number,
      idResultadoEvaluacionDesempeno: number,
      idBancoPreguntas: number,
      idPregunta: number,
      idRespuesta: number,
      puntaje: number
    ) {
      this.id = id;
      this.idResultadoEvaluacionDesempeno = idResultadoEvaluacionDesempeno;
      this.idBancoPreguntas = idBancoPreguntas;
      this.idPregunta = idPregunta;
      this.idRespuesta = idRespuesta;
      this.puntaje = puntaje;
    }
   }
