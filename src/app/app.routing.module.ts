import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/inicio',
		pathMatch: 'full'
	},
	{
		path:'usuarios',
		loadChildren: './modules/usuarios/usuarios.module#UsuariosModule',
    data: { breadcrumb: 'usuarios' }
	},
	{
		path:'inicio',
		loadChildren: './core/main-container/main-container.module#MainContainerModule',
    data: { breadcrumb: 'inicio' }
	}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
