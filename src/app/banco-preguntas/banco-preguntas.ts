import { Categoria } from "./categoria";


export class BancoPreguntas {
  id: number;
  idEmpresa: number;
  tipoBanco: string;
  categoria: Categoria;

    constructor(id: number, idEmpresa: number, tipoBanco: string, categoria: Categoria) {
      this.id = id;
      this.idEmpresa = idEmpresa;
      this.tipoBanco = tipoBanco;
      this.categoria = categoria;
    }
   }
