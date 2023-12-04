export class Habilidades {
    id: number | null;
    tipoHabilidad: string;
    habilidad: string;
    habilidad_en: string;
    
    constructor(id: number | null, tipoHabilidad: string, habilidad: string , habilidad_en: string) {
      this.id = id;
      this.tipoHabilidad = tipoHabilidad;
      this.habilidad = habilidad;
      this.habilidad_en = habilidad_en;
    }
  }