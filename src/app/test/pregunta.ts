import { Respuesta } from "./respuesta";

export class Pregunta {
  id:number;
  pregunta:string;
  respuestas:Respuesta[];

  constructor(id:number, pregunta:string, respuestas:Respuesta[]){
    this.id = id;
    this.pregunta = pregunta;
    this.respuestas = respuestas;
  }
}
