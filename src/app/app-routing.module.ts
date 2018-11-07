import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentAComponent } from './parent-a/parent-a.component';
import { ParentBComponent } from './parent-b/parent-b.component';

export const routes: Routes = [
  {path: 'a', component: ParentAComponent},
  {path: 'b', component: ParentBComponent},
]

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}