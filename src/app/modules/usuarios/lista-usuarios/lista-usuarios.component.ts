import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { ContentUserService } from '../../../core/services';
//import { ContentUser } from '../../../core/models';
import { ContentUserService } from '../../../core/services';
import { ContentUser } from '../../../core/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit{

  contentUser = {} as ContentUser;
  contentUsers: ContentUser[];

  constructor(private contentUserService: ContentUserService) {}

  ngOnInit() {
    this.getContentUsers();
  }

  // defini se um contentUser será criado ou atualizado
  saveContentUser(form: NgForm) {
    if (this.contentUser.id !== undefined) {
      this.contentUserService.updateContentUser(this.contentUser).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.contentUserService.saveContentUser(this.contentUser).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os contentUsers
  getContentUsers() {
    this.contentUserService.getContentUsers().subscribe((contentUsers: ContentUser[]) => {
      this.contentUsers = contentUsers;
    });
  }

  // deleta um contentUser
  deleteContentUser(contentUser: ContentUser) {
    this.contentUserService.deleteContentUser(contentUser).subscribe(() => {
      this.getContentUsers();
    });
  }

  // copia o contentUser para ser editado.
  editContentUser(contentUser: ContentUser) {
    this.contentUser = { ...contentUser };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getContentUsers();
    form.resetForm();
    this.contentUser = {} as ContentUser;
  }


}
