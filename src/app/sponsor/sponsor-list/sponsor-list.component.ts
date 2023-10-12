import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../sponsor';
import { SponsorService } from '../sponsor.service';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html'
})
export class SponsorListComponent implements OnInit {

  selected: boolean = false;
  selectedSponsor!: Sponsor;
  sponsors: Array<Sponsor> = [];

  constructor(private sponsorService: SponsorService) { }

  getSponsors(): void {
    this.sponsorService.getSponsors().subscribe((sponsors) => {
      this.sponsors = sponsors;
    });
  }

  onSelected(sponsor: Sponsor): void {
    this.selected = true;
    this.selectedSponsor = sponsor;
  }

  ngOnInit() {
    this.getSponsors();
  }

}
