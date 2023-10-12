import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorDetail } from '../sponsor-detail';
import { SponsorService } from '../sponsor.service';

@Component({
  selector: 'app-sponsor-details',
  templateUrl: './sponsor-details.component.html'
})
export class SponsorDetailsComponent implements OnInit {

  sponsorId!: string;
  @Input() sponsorDetail!: SponsorDetail;

  constructor(private route: ActivatedRoute,
    private sponsorService: SponsorService) { }

  getSponsor(): void {
    this.sponsorService.getSponsor(this.sponsorId).subscribe((sponsor) => {
      this.sponsorDetail = sponsor;
    });
  }

  ngOnInit() {
    if(this.sponsorDetail === undefined){
      this.sponsorId = this.route.snapshot.paramMap.get('id')!
      if (this.sponsorId) {
        this.getSponsor();
      }
    }
  }

}
