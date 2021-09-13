import { NgModule } from '@angular/core';

import { MainContainerComponent } from './main-container.component';
import { MainContainerRoutingModule} from './main-container.routing.module'

@NgModule({

  declarations: [
    MainContainerComponent
  ],

  imports: [
    MainContainerRoutingModule
  ],

  bootstrap: [
    MainContainerComponent
  ]
})

export class MainContainerModule { }
