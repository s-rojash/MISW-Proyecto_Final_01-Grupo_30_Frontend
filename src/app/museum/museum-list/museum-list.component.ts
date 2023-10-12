import { Component, OnInit } from '@angular/core';
//import { Museum } from '../museum';
import { MuseumService } from '../museum.service';
import { MuseumDetail } from '../museum-detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  /*museums:Array<Museum>=[];
  selectedMuseum!:Museum;
  selected: Boolean = false;*/
  
  museums:Array<MuseumDetail>=[];
  selectedMuseum!:MuseumDetail;
  selected: boolean = false;
  
  constructor(private route: ActivatedRoute,
    private museumService: MuseumService){}


  /*onSelected(museum: Museum): void{
    this.selected = true;
    this.selectedMuseum = museum;
  }*/
  onSelected(museum: MuseumDetail): void{
    this.selected = true;
    this.selectedMuseum = museum;
  }
  getMuseums():void{
        this.museumService.getMuseums().subscribe((museums) => {
        this.museums = museums;
        //para manejo de errores
        //this.museumService.getMuseums().subscribe({next: museums => 
       // this.museums = museums, error: e => console.error(e)
        });
        
    }

  ngOnInit(): void {
      this.getMuseums();
  }

}
