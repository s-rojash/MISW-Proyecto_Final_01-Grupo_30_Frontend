export class PruebaAgendada {
  id: number;
  fecha: string;
  nombrePrueba: string;
  estado: string;
  constructor(id: number, fecha: string, nombrePrueba: string, estado: string) {
    this.id = id;
    this.fecha = fecha;
    this.nombrePrueba = nombrePrueba;
    this.estado = estado;
  }
}
