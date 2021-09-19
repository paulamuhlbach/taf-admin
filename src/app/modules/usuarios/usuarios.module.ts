import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TafMaterialModule } from '../../core/material.module';

import { UsuariosRoutingModule } from './usuarios.routing.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule} from '@angular/platform-browser/animations';
//import { MatExpansionModule } from '@angular/material/expansion';

import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { ImagemUsuariosComponent } from './imagem-usuarios/imagem-usuarios.component';
import { CadastraUsuariosComponent } from './cadastra-usuarios/cadastra-usuarios.component';


@NgModule({

  declarations: [
    ListaUsuariosComponent,
    ListaRolesComponent,
    ImagemUsuariosComponent,
    CadastraUsuariosComponent,
  ],
  imports: [
    CommonModule,
    //BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsuariosRoutingModule,
    TafMaterialModule
    //MatExpansionModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuariosModule { }

