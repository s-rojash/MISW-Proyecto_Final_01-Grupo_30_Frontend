
export class AgendaPrueba {
  id: number;
  idEmpresa: number;
  idCandidato: number;
  idPrueba: number;
  fecha: Date;
  puntos!: number;
  estado: string;

    constructor(id: number,
      idEmpresa: number,
      idCandidato: number,
      idPrueba: number,
      fecha: Date,
      puntos: number,
      estado: string
    ) {
      this.id = id;
      this.idEmpresa = idEmpresa;
      this.idCandidato = idCandidato;
      this.idPrueba = idPrueba;
      this.fecha = fecha;
      this.puntos = puntos;
      this.estado = estado;
    }
   }
