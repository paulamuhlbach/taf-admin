import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios.routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ListaPerfisUsuariosComponent } from './lista-perfis-usuarios/lista-perfis-usuarios.component';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ListaPerfisUsuariosComponent,
    ListaRolesComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
