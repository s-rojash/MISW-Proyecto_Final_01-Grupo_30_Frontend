import { BancoPreguntas } from "./banco-preguntas";
import { Respuesta } from "./respuesta";


export class Pregunta {
  id: number | null;
  pregunta: string;
  bancoPreguntas: BancoPreguntas;
  respuestas: Respuesta[];


    constructor(id: number| null, pregunta: string, bancoPreguntas: BancoPreguntas, respuestas: Respuesta[]) {
      this.id = id;
      this.pregunta = pregunta;
      this.bancoPreguntas = bancoPreguntas;
      this.respuestas = respuestas;
    }
   }
