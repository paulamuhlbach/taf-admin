import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CadastraUsuariosComponent } from './cadastra-usuarios/cadastra-usuarios.component';


export const routes: Routes = [
        { path: '', component: ListaUsuariosComponent },
        {
          path: 'new',
          component: CadastraUsuariosComponent
        },
        {
          path: ':id/edit',
          component: CadastraUsuariosComponent
        }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class UsuariosRoutingModule { }
