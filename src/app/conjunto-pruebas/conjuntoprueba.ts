export class Conjuntoprueba {
  id: number | null;
  bancoPreguntas: { id: number }[];
  nombre: string;
  descripcion: string;

  constructor(id: number | null, bancoPreguntas: { id: number }[], nombre: string, descripcion: string) {
    this.id = id;
    this.bancoPreguntas = bancoPreguntas;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}