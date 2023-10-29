export class Team {
  id: number; // Agrega la propiedad 'id' aquí
  proyectoId: number;
  nombre: string;
  perfilId: number;
  cantidad: number;

  constructor(data: any) {
    this.id = data.id; // Asigna el valor de 'id' desde los datos
    this.proyectoId = data.proyecto.id;
    this.nombre = data.nombre;
    this.perfilId = data.perfil.id;
    this.cantidad = data.cantidad;
  }
}
