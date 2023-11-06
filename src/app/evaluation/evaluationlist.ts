export class Evaluationlist {
  candidatos:string;
  puntajes:string;
  fecha:string;
  status:string;

  constructor(candidatos:string, puntajes:string, fecha:string, status:string){
    this.candidatos = candidatos;
    this.puntajes = puntajes;
    this.fecha = fecha;
    this.status = status;
  }
}
