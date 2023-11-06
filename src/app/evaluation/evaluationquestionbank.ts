import { Categoria } from "../banco-preguntas/categoria";

export class Evaluationquestionbank {
  id: number;
  idEmpresa: number;
  tipoBanco: string;
  categoria: Categoria;

  constructor(id: number, idEmpresa: number, tipoBanco: string, categoria: Categoria){
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.tipoBanco = tipoBanco;
    this.categoria = categoria;
  }
}
