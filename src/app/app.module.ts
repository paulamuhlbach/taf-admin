import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { CoreModule } from './core/core.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EnderecosModule } from './modules/enderecos/enderecos.module';
import { MainContainerModule } from './modules/main-container/main-container.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MainContainerModule,
    UsuariosModule,
    EnderecosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
