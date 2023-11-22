/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileCreateComponent } from './profile-create.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ProfileCreateComponent', () => {
  let component: ProfileCreateComponent;
  let fixture: ComponentFixture<ProfileCreateComponent>;
  let profileService: ProfileService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })],
      declarations: [ ProfileCreateComponent ],
      providers: [ProfileService, { provide: ToastrService, useValue: spy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreateComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.profileForm.patchValue({ nombre: 'AA'});
    fixture.detectChanges();
    expect(component.profileForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.profileForm.patchValue({ nombre: '' });
    fixture.detectChanges();
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('should return form inValid min lenght value', () => {
    component.profileForm.patchValue({ nombre: 'A' });
    fixture.detectChanges();
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('createProfile test', () => {
    spyOn(component, 'createProfile');
    component.profileForm.patchValue({ nombre: 'AA' });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.createProfile).toHaveBeenCalled();
  });

  it("should call createProfile createProfile and return response success", () => {
    const profile = { id: 1, nombre: 'QA' };
    let response: Profile = { id: 1, nombre: 'QA' };

    spyOn(profileService, 'createProfile').and.returnValue(of(response));

    component.createProfile(profile);
    fixture.detectChanges();
    expect(toastrSpy.success).toHaveBeenCalled();
  });
});
