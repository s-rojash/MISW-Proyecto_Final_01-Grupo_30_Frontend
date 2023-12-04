import { Categoria } from "./categoria";


export class BancoPreguntas {
  id: number | null;
  idEmpresa: number;
  tipoBanco: string;
  categoria: Categoria;
  selected:boolean;

    constructor(id: number, idEmpresa: number, tipoBanco: string, categoria: Categoria, selected: boolean) {
      this.id = id;
      this.idEmpresa = idEmpresa;
      this.tipoBanco = tipoBanco;
      this.categoria = categoria;
      this.selected = selected;
    }
   }
