import { Team } from "./team";

export class TeamAssign {
  id:number;
  equipo: Team;
  idCandidato: number;

  constructor(id:number, equipo: Team, idCandidato: number){
    this.id = id;
    this.equipo = equipo;
    this.idCandidato = idCandidato;
  }
}
