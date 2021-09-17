import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button1Component } from './button1/button1.component';



@NgModule({
  declarations: [Button1Component],
  imports: [
    CommonModule,
  ],
  exports:[
    Button1Component
  ]
})
export class LibModule { }
