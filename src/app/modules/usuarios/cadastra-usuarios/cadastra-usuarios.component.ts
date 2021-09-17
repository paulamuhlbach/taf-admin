import { OnInit , AfterContentChecked, Inject, Injector, Injectable, Component} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { BaseResourseFormComponent } from 'src/app/core/base-resource';
import { ContentUserRoleService, ContentUserService, UserProfileService } from '../../../core/services';
import { ContentUserRole, ContentUser, UserProfile } from '../../../core/models';
import { switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastra-usuarios',
  templateUrl: './cadastra-usuarios.component.html',
  styleUrls: ['./cadastra-usuarios.component.css']
})


export class CadastraUsuariosComponent extends BaseResourseFormComponent<ContentUser> implements OnInit {

  contentUser: ContentUser;
  idContentUser: number;
  idRole: number;
  idUserProfile: number;
  ativo: string;
  userProfiles: Array<UserProfile>;

  protected route: ActivatedRoute;
  protected router: Router;

  constructor(
    private contentUserService: ContentUserService,
    private userProfileService: UserProfileService,
    protected injector: Injector,

    ) {

      super(injector, new ContentUser(), contentUserService, ContentUser.fromJson);

    }
    ngOnInit() {
      this.loadUserProfiles();
      super.ngOnInit();
      console.log("currentAction ==> "+ this.setCurrentAction());
    console.log("path ==> "+ this.route.snapshot.url[0].path);
    }

    protected buildResourceForm(){
      this.resourceForm = this.formBuilder.group({
        id:[null],
        idRole:[null],
        idUserProfile:[null],
        ativo:[null]
        //name:[null, [Validators.required, Validators.minLength(2)]], // define q o campo é obrigatório e q tenha no mínimo 2 caracteres

      })
    }

    protected creationPageTitle(): string{
      return "Cadastro de novo usuário";
    }

    protected editionPageTitle(): string{
      const contentUserName = this.resource.id|| "";
      return "Editando usuário: " + contentUserName;
    }

    protected loadUserProfiles(){
      this.userProfileService.getAll().subscribe(
        userProfiles => this.userProfiles = userProfiles
      );
    }


}
