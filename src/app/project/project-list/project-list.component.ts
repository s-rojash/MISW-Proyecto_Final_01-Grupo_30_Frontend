import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Array<Project> = [];


  constructor(private  projectService: ProjectService, private router: Router, private toastr: ToastrService ) { }

  
  getProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  
  ngOnInit(): void {
    this.getProjects();
    this.projectService.projectCreated$.subscribe(() => {
      // Actualizar la lista de proyectos cuando se crea un nuevo proyecto
      this.getProjects();
    });

  }

}
