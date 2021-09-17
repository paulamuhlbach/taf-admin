import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../../core/base-resource'

import { ContentUserRoleService } from '../../../core/services';
import { ContentUserRole } from '../../../core/models';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css'],
})

export class ListaRolesComponent extends BaseResourceListComponent<ContentUserRole> implements OnInit{

  title: string = 'Cadastra role de usuário'


  constructor(
    private contentUserRoleService: ContentUserRoleService) {

    super(contentUserRoleService)
   }



}
