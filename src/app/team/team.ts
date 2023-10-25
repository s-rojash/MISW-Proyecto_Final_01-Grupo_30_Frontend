export class Team {
  proyecto: { id: number };
  nombre: string;
  perfil: { id: number };
  cantidad: number;

  constructor(data: any) {
    this.proyecto = { id: data.proyecto.id };
    this.nombre = data.nombre;
    this.perfil = { id: data.perfil.id };
    this.cantidad = data.cantidad;
  }
}
