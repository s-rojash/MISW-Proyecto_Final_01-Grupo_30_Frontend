import { Exhibitions } from "../exhibitions/exhibitions";
import { Sponsor } from "./sponsor";

export class SponsorDetail extends Sponsor {

  constructor(id: number,
    name: string,
    description: string,
    webssite: string,
    exhibition?:Exhibitions
    ){
      super(id, name, description, webssite, exhibition);
    }
}
