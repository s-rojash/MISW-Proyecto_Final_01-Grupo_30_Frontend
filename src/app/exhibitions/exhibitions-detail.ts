import { Artworks } from "../artworks/artworks";
import { Sponsor } from "../sponsor/sponsor";
import { Exhibitions } from "./exhibitions";

export class ExhibitionsDetail extends Exhibitions {

  constructor(
    id: number,
    name: string,
    description: string,
    sponsor: Sponsor,
    artworks: Artworks[]
    ){
      super(id, name, description, sponsor, artworks);
    }
}
