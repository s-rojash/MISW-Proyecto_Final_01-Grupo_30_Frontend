import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
const routes: Routes = [{
 path: 'login',
 component: LoginPageComponent
},
{
  path: 'logout',
  component: LogoutPageComponent
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class LoginRoutingModule { }
