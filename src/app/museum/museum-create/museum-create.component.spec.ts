import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MuseumCreateComponent } from './museum-create.component';

//IMportar para pruebas exitosas
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('MuseumCreateComponent', () => {
  let component: MuseumCreateComponent;
  let fixture: ComponentFixture<MuseumCreateComponent>;
  let debug: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],
      declarations: [ MuseumCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debe tener un campo de nombre de museo', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
    //const element = debug.query(By.css("input[id='name']")).nativeElement;
    const element = fixture.debugElement.query(By.css("input[id='name']")).attributes['formControlName'];
    expect(element).toEqual('name');
    });
    
   it('Debe tener un campo de direccion', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
    //const element = debug.query(By.css("input[id='name']")).nativeElement;
    const element = fixture.debugElement.query(By.css("input[id='address']")).attributes['formControlName'];
    expect(element).toEqual('address');
    });
    
   it('Debe tener un campo de imagen', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
    //const element = debug.query(By.css("input[id='name']")).nativeElement;
    const element = fixture.debugElement.query(By.css("input[id='image']")).attributes['formControlName'];
    expect(element).toEqual('image');
    });
    
    it('Debe tener un boton de creacion', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
    //const element = debug.query(By.css("input[id='name']")).nativeElement;
    const element = fixture.debugElement.query(By.css("button[type='submit']")).attributes['class'];
    expect(element).toEqual('btn btn-primary');
    });

});
