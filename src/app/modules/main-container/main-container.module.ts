import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container.component';
import { MainContainerRoutingModule} from './main-container.routing.module'

@NgModule({

  declarations: [
    MainContainerComponent
  ],

  imports: [
    RouterModule,
    MainContainerRoutingModule
  ],

  bootstrap: [
    MainContainerComponent
  ]
})

export class MainContainerModule { }
