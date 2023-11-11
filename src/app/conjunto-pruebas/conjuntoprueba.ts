import { BancoPreguntas } from "../banco-preguntas/banco-preguntas";


export class Conjuntoprueba {
    id : number | null;
    bancoPreguntas: BancoPreguntas[];
    nombre : string;
    descripcion : string;

    constructor(id: number| null,  bancoPreguntas: BancoPreguntas[],nombre: string, descripcion:string) {
        this.id = id;
        this.bancoPreguntas = bancoPreguntas;
        this.nombre =nombre;
        this.descripcion = descripcion
      }
}

