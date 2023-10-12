import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exhibitions } from '../exhibitions';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
  selector: 'app-exhibitions-list',
  templateUrl: './exhibitions-list.component.html',
  styleUrls: ['./exhibitions-list.component.css']
})
export class ExhibitionsListComponent implements OnInit {

  selected: boolean = false;
  selectedExhibition!: Exhibitions;
  exhibitions: Array<Exhibitions> = [];

  museumId!: string;
  idExh!: string;

  constructor(private route: ActivatedRoute,
    private exhibitionsService: ExhibitionsService) { }

  getExhibitions(): void {
    this.exhibitionsService.getExhibitions(this.museumId).subscribe((exhibitions) => {
      this.exhibitions = exhibitions;
    });
  }

  onSelected(exhibitions: Exhibitions): void {
    this.selected = true;
    this.selectedExhibition = exhibitions;
  }

  ngOnInit() {
    this.museumId = this.route.snapshot.paramMap.get('id')!
    this.idExh = this.route.snapshot.paramMap.get('idExh')!
    this.getExhibitions();
  }
}
