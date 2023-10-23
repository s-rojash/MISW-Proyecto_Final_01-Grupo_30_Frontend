import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworksModule } from './artworks/artworks.module';
import { ImageModule } from './image/image.module';
import { MuseumModule } from './museum/museum.module';
import { ArtistModule } from './artist/artist.module';
import { MovementModule } from './movement/movement.module';

//clases no creadas
import { ExhibitionsModule } from './exhibitions/exhibitions.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { PrincipalModule } from './principal/principal.module';
//import { ArtWorkModule } from './artwork/artwork.module';
//import { MovementModule } from './movement/movement.module';
import { MuseumRoutingModule } from './museum/museum-routing.module';
import { ExhibtionRoutingModule } from './exhibitions/exhibition-routing.module';
import { PrincipalRoutingModule } from './principal/principal-routing.module';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { SignupModule } from './signup/signup.module';
import { SignpuRoutingModule } from './signup/signup-routing.module';
import { ArtistRoutingModule } from './artist/artist-routing.module';
import { ArtworkRoutingModule } from './artworks/artwork-routing.module';
import { MovementRoutingModule } from './movement/movement-routing-module';
import { ProjectRoutingModule } from './project/project-routing.module';

//invoca servicio de intercepcion
import { HttpErrorInterceptorService } from './interceptors/interceptor-errors.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ProjectModule } from './project/project.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';




export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [			
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArtworksModule,
    ImageModule,
    HttpClientModule,
    MuseumModule,
    ProjectModule,
    ProfileModule,
    ProfileRoutingModule,
    ArtistModule,
    MovementModule,
    SponsorModule,
    ExhibitionsModule,
    PrincipalModule,
    MuseumRoutingModule,
    ExhibtionRoutingModule,
    PrincipalRoutingModule,
    LoginModule,
    LoginRoutingModule,
    SignupModule,
    SignpuRoutingModule,
    ArtistRoutingModule,
    ArtworkRoutingModule,
    MovementRoutingModule,
    ProjectRoutingModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
