import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContentUserRoleService } from '../../../core/services';
import { ContentUserRole } from '../../../core/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastra-usuarios',
  templateUrl: './cadastra-usuarios.component.html',
  styleUrls: ['./cadastra-usuarios.component.css']
})

export class CadastraUsuariosComponent implements OnInit{

  contentUserRole = {} as ContentUserRole;
  contentUserRoles: ContentUserRole[];

  constructor(private contentUserRoleService: ContentUserRoleService) {}

  ngOnInit() {
    this.getContentUserRoles();
  }

  // defini se um contentUserRole será criado ou atualizado
  saveContentUserRole(form: NgForm) {
    if (this.contentUserRole.id !== undefined) {
      this.contentUserRoleService.updateContentUserRole(this.contentUserRole).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.contentUserRoleService.saveContentUserRole(this.contentUserRole).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os contentUserRoles
  getContentUserRoles() {
    this.contentUserRoleService.getContentUserRoles().subscribe((contentUserRoles: ContentUserRole[]) => {
      this.contentUserRoles = contentUserRoles;
    });
  }

  // deleta um contentUserRole
  deleteContentUserRole(contentUserRole: ContentUserRole) {
    this.contentUserRoleService.deleteContentUserRole(contentUserRole).subscribe(() => {
      this.getContentUserRoles();
    });
  }

  // copia o contentUserRole para ser editado.
  editContentUserRole(contentUserRole: ContentUserRole) {
    this.contentUserRole = { ...contentUserRole };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getContentUserRoles();
    form.resetForm();
    this.contentUserRole = {} as ContentUserRole;
  }


}
