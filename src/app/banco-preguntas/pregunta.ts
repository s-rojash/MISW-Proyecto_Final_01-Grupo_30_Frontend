

export class Pregunta {
  idPregunta: number;
  pregunta: string;
  idBancoPreguntas: number;

    constructor(idPregunta: number, pregunta: string, idBancoPreguntas: number) {
      this.idPregunta = idPregunta;
      this.pregunta = pregunta;
      this.idBancoPreguntas = idBancoPreguntas;
    }
   }
