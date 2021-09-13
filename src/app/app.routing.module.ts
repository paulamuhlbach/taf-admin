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
		loadChildren: './modules/usuarios/usuarios.module#UsuariosModule'
	},
	{
		path:'inicio',
		loadChildren: './core/main-container/main-container.module#MainContainerModule'
	}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
