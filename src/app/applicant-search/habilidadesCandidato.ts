import { Signupapplicant } from "../signup/signupapplicant";
import { Habilidades } from "./habilidades";

export class Habilidadescandidato {
    id: number | null;
    candidato: Signupapplicant;
    habilidad: Habilidades;
    
    constructor(id: number | null, candidato: Signupapplicant, habilidad: Habilidades) {
      this.id = id;
      this.candidato = candidato;
      this.habilidad = habilidad;
    }
  }