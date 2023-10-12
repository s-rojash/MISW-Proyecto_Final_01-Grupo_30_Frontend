import { Artworks } from "../artworks/artworks";
import { Sponsor } from "../sponsor/sponsor";

export class Exhibitions {
  id: number;
  name: string;
  description: string;
  sponsor: Sponsor;
  artworks: Artworks[];

  constructor(
    id: number,
    name: string,
    description: string,
    sponsor: Sponsor,
    artworks: Artworks[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sponsor = sponsor;
    this.artworks = artworks;
  }
}
