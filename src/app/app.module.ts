import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageModule } from './image/image.module';

//clases no creadas
import { PrincipalModule } from './principal/principal.module';
import { PrincipalRoutingModule } from './principal/principal-routing.module';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { SignupModule } from './signup/signup.module';
import { SignpuRoutingModule } from './signup/signup-routing.module';
import { ProjectModule } from './project/project.module';
import { ProjectRoutingModule } from './project/project-routing.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { EvaluationRoutingModule } from './evaluation/evaluation-routing.module';
import { BancoPreguntasModule } from './banco-preguntas/banco-preguntas.module';
import { BancoPreguntasRoutingModule } from './banco-preguntas/banco-preguntas-routing.module';
import { ProfileModule } from './profile/profile.module'; 
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { TeamModule } from './team/team.module';
import { TeamRoutingModule } from './team/team-routing.module';


//invoca servicio de intercepcion
import { HttpErrorInterceptorService } from './interceptors/interceptor-errors.service';
import { HttpApiAuthenticationInterceptorService } from './interceptors/interceptor-api-authentication.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ApplicantSearchModule } from './applicant-search/applicant-search.module';
import { ApplicationSearchRoutingModule } from './applicant-search/applicant-search.routing.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [			
    AppComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageModule,
    HttpClientModule,
    ProjectModule,
    ProfileModule,
    ProfileRoutingModule,
    PrincipalModule,
    PrincipalRoutingModule,
    LoginModule,
    LoginRoutingModule,
    SignupModule,
    SignpuRoutingModule,
    ProjectRoutingModule,
    EvaluationModule,
    EvaluationRoutingModule,
    TeamRoutingModule,
    TeamModule,
    BancoPreguntasModule,
    BancoPreguntasRoutingModule,
    ApplicantSearchModule,
    ApplicationSearchRoutingModule,
    ToastrModule.forRoot({
        timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    //manejo de errores
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiAuthenticationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
