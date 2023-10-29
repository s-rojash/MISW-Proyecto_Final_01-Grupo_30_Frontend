import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  selectedTeam: Team | null = null; 

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  onTeamSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const numericTeamId = parseInt(selectedValue, 10);
    
    if (!isNaN(numericTeamId)) {
      this.selectedTeam = this.teams.find((team) => team.id === numericTeamId) || null;
    } else {
      this.selectedTeam = null;
    }
  }
  clearSelection(): void {
    this.selectedTeam = null; 
  }
}
