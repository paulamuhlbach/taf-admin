import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../../core/base-resource'

import { ContentUserService, ContentUserRoleService } from '../../../core/services';
import { ContentUser, ContentUserRole } from '../../../core/models';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})

export class ListaUsuariosComponent extends BaseResourceListComponent<ContentUser> implements OnInit{

  title: string = 'Cadastra usuarios';
  panelOpenState = false;
  quantidadeUsers: number = 0;

  contentUserRoles: Array<ContentUserRole>;
  contentUsers: Array<ContentUser>;

  constructor(
    private contentUserService: ContentUserService,
    private contentUserRoleService: ContentUserRoleService) {

    super(contentUserService)
   }


   ngOnInit() {
    this.loadRoles();
    super.ngOnInit();
  }

   protected loadRoles(){
    this.contentUserRoleService.getAll().subscribe(
      contentUserRoles => this.contentUserRoles = contentUserRoles
    );
  }


}
