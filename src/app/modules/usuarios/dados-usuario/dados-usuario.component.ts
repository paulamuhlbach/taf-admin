import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../../core/base-resource'

import { UserProfileService, ContentUserRoleService, ContentUserService } from '../../../core/services';
import { UserProfile, ContentUser, ContentUserRole } from '../../../core/models';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})

export class ListaUsuariosComponent extends BaseResourceListComponent<UserProfile> implements OnInit{

  title: string = 'Dados usuário'

  contentUserRoles: Array<ContentUserRole>;
  contentUser: Array<ContentUser>;

  constructor(
    private userProfileService: UserProfileService,
    private contentUserRoleService: ContentUserRoleService,
    private contentUserService: ContentUserService) {

    super(userProfileService)
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

  protected loadUsers(){
    this.contentUserService.getAll().subscribe(
      contentUser => this.contentUser = contentUser
    );
  }

}

