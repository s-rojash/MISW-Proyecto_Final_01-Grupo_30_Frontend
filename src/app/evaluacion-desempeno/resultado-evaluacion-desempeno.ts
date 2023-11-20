
export class ResultadoEvaluacionDesempeno {
  id: number;
  idAsignarEquipo: number;
  idPrueba: number;
  fecha: Date;
  puntos!: number;

    constructor(id: number,
      idAsignarEquipo: number,
      idPrueba: number,
      fecha: Date,
      puntos: number,
    ) {
      this.id = id;
      this.idAsignarEquipo = idAsignarEquipo;
      this.idPrueba = idPrueba;
      this.fecha = fecha;
      this.puntos = puntos;
    }
   }
