import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ProjectCreateComponent } from './project-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProjectModule } from '../project.module';
import { HttpTestingController,HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';



describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;
  let projectService: ProjectService;
  let toastrService: ToastrService;
  let httpMock: HttpTestingController;
  let apiUrl: string = environment.baseUrlProyectos + '/proyectos/';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        ProjectModule,
        MatCardModule,
        MatIconModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
        TranslateModule.forRoot(),
      ],
      declarations: [ProjectCreateComponent],
      providers: [ToastrService, ProjectService],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the projectForm', () => {
    expect(component.projectForm).toBeDefined();
  });

  it('should check if form is valid', () => {
    component.projectForm.setValue({ nombre: 'Test', descripcion: 'Test Description' });
    expect(component.isFormValid()).toBe(true);
  });

  it('should check if form is invalid', () => {
    component.projectForm.setValue({ nombre: '', descripcion: '' });
    expect(component.isFormValid()).toBe(false);
  });

  it('should not call createProject when form is invalid', () => {
    const createProjectSpy = spyOn(projectService, 'createProject').and.stub();

    component.projectForm.setValue({ nombre: '', descripcion: '' });
    component.onSubmit();

    expect(createProjectSpy).not.toHaveBeenCalled();
  });
});
