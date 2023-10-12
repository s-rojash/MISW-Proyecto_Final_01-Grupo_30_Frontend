import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MovementCreateComponent } from './movement-create.component';
//IMportar para pruebas exitosas
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('MovementCreateComponent', () => {
  let component: MovementCreateComponent;
  let fixture: ComponentFixture<MovementCreateComponent>;
 let debug: DebugElement;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],
      declarations: [ MovementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debe tener un campo de nombre de movimiento', () => {
    const element = fixture.debugElement.query(By.css("input[id='name']")).attributes['formControlName'];
    expect(element).toEqual('name');
    });
  
  it('Debe tener un campo de descripcion', () => {
    const element = fixture.debugElement.query(By.css("textarea[id='description']")).attributes['formControlName'];
    expect(element).toEqual('description');
    });
  
  it('Debe tener un campo de años activo', () => {
    const element = fixture.debugElement.query(By.css("input[id='activeYears']")).attributes['formControlName'];
    expect(element).toEqual('activeYears');
    });
  
    it('Debe tener un boton de creacion', () => {
    const element = fixture.debugElement.query(By.css("button[type='submit']")).attributes['class'];
    expect(element).toEqual('btn btn-primary');
    });
  
    it('Debe tener un boton de cancelacion', () => {
    const element = fixture.debugElement.query(By.css("button[type='button']")).attributes['class'];
    expect(element).toEqual('btn btn-danger ml-3');
    }); 
  
});
