import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExhibitionsDetail } from '../exhibitions-detail';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
  selector: 'app-exhibitions-details',
  templateUrl: './exhibitions-details.component.html'
})
export class ExhibitionsDetailsComponent implements OnInit {

  exhibitionId!: string;
  @Input() exhibitionsDetail!: ExhibitionsDetail;

  constructor(
    private route: ActivatedRoute,
    private exhibitionsService: ExhibitionsService) { }

  getExhibition(): void {
    this.exhibitionsService.getExhibition(this.exhibitionId).subscribe((exhibition) => {
      this.exhibitionsDetail = exhibition;
    });
  }

  ngOnInit() {
    if(this.exhibitionsDetail === undefined){
      this.exhibitionId = this.route.snapshot.paramMap.get('id')!
      console.log(this.exhibitionId);
      if (this.exhibitionId) {
        this.getExhibition();
      }
    }
  }

}
