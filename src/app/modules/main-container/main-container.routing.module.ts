import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container.component';

export const routes: Routes = [
    { path: '', component: MainContainerComponent},

];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainContainerRoutingModule { }
