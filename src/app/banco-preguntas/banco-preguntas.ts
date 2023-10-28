

export class BancoPreguntas {
  idBancoPreguntas: number;
  idEmpresa: number;
  tipoBanco: string;
  idCategoria: number;

    constructor(idBancoPreguntas: number, idEmpresa: number, tipoBanco: string, idCategoria: number) {
      this.idBancoPreguntas = idBancoPreguntas;
      this.idEmpresa = idEmpresa;
      this.tipoBanco = tipoBanco;
      this.idCategoria = idCategoria;
    }
   }
