import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TafMaterialModule } from './material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu';
import { SortByPipe } from './pipes/sort-by-pipe';
import { SearchFilterPipe } from './pipes/search-filter-pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SortByPipe,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    TafMaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TafMaterialModule
  ],
  bootstrap: [MenuComponent, HeaderComponent],
})
export class CoreModule { }
