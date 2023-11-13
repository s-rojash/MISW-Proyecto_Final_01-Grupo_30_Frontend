
export class Candidato {
  id: number;
  numDocumento: number;
  apellidos: string;
  nombres: string;
  email: string;
  celular: string;

    constructor(  id: number,
  numDocumento: number,
  apellidos: string,
  nombres: string,
  email: string,
  celular: string
    ) {
      this.id = id;
      this.numDocumento = numDocumento;
      this.apellidos = apellidos;
      this.nombres = nombres;
      this.email = email;
      this.celular = celular;
    }
   }
