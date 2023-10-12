import { Component, Input, OnInit } from '@angular/core';
//import { Museum } from '../museum';
import { MuseumDetail } from '../museum-detail';
import { ActivatedRoute } from '@angular/router';
import { MuseumService } from '../museum.service';

@Component({
  selector: 'app-museum-detail',
  templateUrl: './museum-detail.component.html'
})
export class MuseumDetailComponent implements OnInit {

  museumId!: string;
  //@Input() museumDetail!: Museum;
  @Input() museumDetail!: MuseumDetail;
  museumDetail2!: Array<MuseumDetail>;
  
  getMuseum(){
       this.museumService.getMuseum(this.museumId).subscribe(museum =>{
        this.museumDetail2 = museum;
        });
   }
  constructor(private route: ActivatedRoute,
   private museumService: MuseumService) { }

   

  ngOnInit(): void {
      if(this.museumDetail2 === undefined)
      {
            this.museumId = this.route.snapshot.paramMap.get('id')!
            if (this.museumId) {
              this.getMuseum();
            }
        }
  }

}
