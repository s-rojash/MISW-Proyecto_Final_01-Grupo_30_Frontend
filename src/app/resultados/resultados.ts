import { Prueba } from "../banco-preguntas/prueba";
import { Signupapplicant } from "../signup/signupapplicant";

export class Resultados {
    id?: number;
    idCandidato: number;
    prueba: Prueba;
    puntaje: number;
    estado: string;
    fechaPresentacion: string; 
  
    constructor(
      id: number,
      prueba: Prueba,
      idCandidato: number,
      puntaje: number,
      estado: string,
      fechaPresentacion: string
    ) {
      this.id = id;
      this.prueba = prueba;
      this.idCandidato = idCandidato;
      this.puntaje = puntaje;
      this.estado = estado;
      this.fechaPresentacion = fechaPresentacion;
    }
  }