export class Respuesta {
  id:number;
  respuesta:string;
  estado:string;
  puntos:number;

  constructor(id:number, respuesta:string, estado:string, puntos:number){
    this.id = id;
    this.respuesta = respuesta;
    this.estado = estado;
    this.puntos = puntos;
  }
}
