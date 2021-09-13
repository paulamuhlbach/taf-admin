import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({

  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA],

})
export class CoreModule { }
