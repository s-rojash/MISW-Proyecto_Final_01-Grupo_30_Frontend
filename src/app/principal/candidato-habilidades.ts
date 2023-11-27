import { Applicantskills } from "../applicant/applicantskills";
import { Signupapplicant } from "../signup/signupapplicant";

export class CandidatoHabilidades {
  id:number;
  candidato: Signupapplicant;
  habilidad: Applicantskills;

  constructor(id:number, candidato: Signupapplicant, habilidad: Applicantskills){
    this.id = id;
    this.candidato = candidato;
    this.habilidad = habilidad;
  }
}
