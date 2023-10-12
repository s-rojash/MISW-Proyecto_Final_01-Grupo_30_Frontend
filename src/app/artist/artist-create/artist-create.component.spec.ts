import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArtistCreateComponent } from './artist-create.component';
//IMportar para pruebas exitosas
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';



describe('ArtistCreateComponent', () => {
  let component: ArtistCreateComponent;
  let fixture: ComponentFixture<ArtistCreateComponent>;
  let debug: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],  
      declarations: [ ArtistCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debe tener un campo de nombre de artista', () => {
    const element = fixture.debugElement.query(By.css("input[id='name']")).attributes['formControlName'];
    expect(element).toEqual('name');
    });
  
  it('Debe tener un campo de fecha de nacimiento', () => {
    const element = fixture.debugElement.query(By.css("input[id='birthdate']")).attributes['formControlName'];
    expect(element).toEqual('birthdate');
    });
  
  it('Debe tener un campo de imagen', () => {
       const element = fixture.debugElement.query(By.css("input[id='image']")).attributes['formControlName'];
    expect(element).toEqual('image');
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
