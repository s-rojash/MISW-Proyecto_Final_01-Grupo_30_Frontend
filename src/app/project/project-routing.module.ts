import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';


const routes: Routes = [{
 path: 'projects',
 children: [
   
   {
     path: 'create',
     component: ProjectCreateComponent
   },
   {
    path: 'get',
    component: ProjectListComponent
  },
  
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ProjectRoutingModule { }