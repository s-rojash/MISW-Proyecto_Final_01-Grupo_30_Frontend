export class Resultados {
    id: number;
    idPrueba: number;
    idCandidato: number;
    puntaje: number;
    estado: string;
    fechaPresentacion: string; 
  
    constructor(
      id: number,
      idPrueba: number,
      idCandidato: number,
      puntaje: number,
      estado: string,
      fechaPresentacion: string
    ) {
      this.id = id;
      this.idPrueba = idPrueba;
      this.idCandidato = idCandidato;
      this.puntaje = puntaje;
      this.estado = estado;
      this.fechaPresentacion = fechaPresentacion;
    }
  }