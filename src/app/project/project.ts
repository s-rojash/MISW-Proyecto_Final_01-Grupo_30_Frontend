export class Project {
  idEmpresa: number;
  nombre: string;
  descripcion: string;
  editable: boolean = false;
  id: number | undefined;

  constructor(idEmpresa: number, nombre: string, descripcion: string) {
    this.idEmpresa = idEmpresa;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}