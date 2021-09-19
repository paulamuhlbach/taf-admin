import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnderecosComponent } from './enderecos.component';


@NgModule({
  declarations: [EnderecosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [EnderecosComponent]

})
export class EnderecosModule { }
