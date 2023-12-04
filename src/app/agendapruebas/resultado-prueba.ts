
export class ResultadoPrueba {
  id: number;
  idAgendaPrueba: number;
  respuestas: {};
    constructor(id: number,
      idAgendaPrueba: number,
      respuestas: any
    ) {
      this.id = id;
      this.idAgendaPrueba = idAgendaPrueba;
      this.respuestas = respuestas;
    }
   }
