
export class ResultadoEvaluacionDesempeno {
  id: number;
  idAsignarEquipo: number;
  idPrueba: number;
  fecha: Date;
  puntos!: number;
  estado: string;

    constructor(id: number,
      idAsignarEquipo: number,
      idPrueba: number,
      fecha: Date,
      puntos: number,
      estado: string
    ) {
      this.id = id;
      this.idAsignarEquipo = idAsignarEquipo;
      this.idPrueba = idPrueba;
      this.fecha = fecha;
      this.puntos = puntos;
      this.estado = estado;
    }
   }
