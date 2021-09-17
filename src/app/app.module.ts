import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { MainContainerModule } from './core/main-container/main-container.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MenuComponent } from './core/menu/menu.component';
import { BreadCrumbComponent } from './core/breadcrumb/breadcrumb.component';
import { FormFieldErrorComponent } from './core/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './core/server-error-messages/server-error-messages.component';


@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BreadCrumbComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainContainerModule,
    UsuariosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
