export class PresentarPrueba {
  id:number;
  idPruebaCandidato: number;
  idCandidato: number;
  idPrueba: number;
  idPregunta: number | null;
  idRespuesta: number | undefined;
  fecha: Date | null;

  constructor(id:number, idPruebaCandidato: number, idCandidato: number, idPrueba: number, idPregunta: number | null,
    idRespuesta: number | undefined, fecha: Date | null){
      this.id = id;
      this.idPruebaCandidato = idPruebaCandidato;
      this.idCandidato = idCandidato;
      this.idPrueba = idPrueba;
      this.idPregunta = idPregunta;
      this.idRespuesta = idRespuesta;
      this.fecha = fecha;
  }
}
