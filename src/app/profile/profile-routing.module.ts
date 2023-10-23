import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileCreateComponent } from './profile-create/profile-create.component';



const routes: Routes = [{
 path: 'profile',
 children: [
   
   {
     path: 'create',
     component: ProfileCreateComponent
   },
   
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ProfileRoutingModule { }