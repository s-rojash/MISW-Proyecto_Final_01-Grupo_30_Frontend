export class Project {
  idEmpresa: number | undefined ;
  nombre: string;
  descripcion: string;
  editable: boolean = false;
  id: number ;
 
  constructor( id:number,nombre: string, descripcion: string) {
     this.id = id; 
     this.nombre = nombre;
     this.descripcion = descripcion;
  }
 }