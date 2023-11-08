import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Project } from '../project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Array<Project> = [];
  @Input() showLabel: boolean = true;
  @Output() saveProject = new EventEmitter<Project>();

  constructor(private projectService: ProjectService, private router: Router, private toastr: ToastrService) { }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projects.forEach((project) => (project.editable = false));
    });
  }

  toggleEdit(project: Project): void {
    if (project.editable) {
      // Lógica para guardar los cambios
      this.onSaveProject(project);
    } else {
      // Habilita la edición
      project.editable = true;
    }
  }

  onSave(project: Project): void {
    this.saveProject.emit(project);
  }

  onSaveProject(project: Project): void {
  this.projectService.updateProject(project).subscribe((response) => {
    console.log('Project updated successfully!');
    this.toastr.success("Confirmation", "Project modified")
    this.getProjects(); // Actualiza la lista de proyectos
  });
}

  ngOnInit(): void {
    this.getProjects();
    this.projectService.projectCreated$.subscribe(() => {
      this.getProjects();
    });
  }
}
