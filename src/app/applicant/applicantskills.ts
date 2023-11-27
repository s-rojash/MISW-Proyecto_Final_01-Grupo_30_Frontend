export class Applicantskills {
  id: number;
  tipoHabilidad: string;
  habilidad: string;
  habilidad_en: string;

  constructor(id: number, tipoHabilidad: string, habilidad: string, habilidad_en: string){
    this.id = id;
    this.tipoHabilidad = tipoHabilidad;
    this.habilidad = habilidad;
    this.habilidad_en = habilidad_en;
  }
}
