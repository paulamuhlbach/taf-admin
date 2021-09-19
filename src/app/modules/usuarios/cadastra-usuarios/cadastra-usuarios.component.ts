import { OnInit , AfterContentChecked, Inject, Injector, Injectable, Component} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { BaseResourseFormComponent } from 'src/app/core/base-resource';
import { ContentUserRoleService } from '../../../core/services/contentUserRole.service';
import { ContentUserService } from '../../../core/services/contentUser.service';
import { UserProfileService } from '../../../core/services/userProfile.service';
import { CidadeService } from '../../../core/services/cidade.service';
import { EnderecoService } from '../../../core/services/endereco.service';
import { EstadoService } from '../../../core/services/estado.service';
import { InstituicaoService }from '../../../core/services/instituicao.service';
import { ImagemService } from './../../../core/services/imagem.service';
import { ContentUserRole,
         ContentUser,
         UserProfile,
         Cidade,
         Estado,
         Endereco ,
         Instituicao,
         Imagem} from '../../../core/models';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-cadastra-usuarios',
  templateUrl: './cadastra-usuarios.component.html',
  styleUrls: ['./cadastra-usuarios.component.css']
})


export class CadastraUsuariosComponent extends BaseResourseFormComponent<UserProfile> implements OnInit {

  userProfile: UserProfile;
  contentUser: ContentUser;
  contentUserRole: ContentUserRole;
  endereco: Endereco;
  cidade: Cidade;
  estado: Estado;
  userImage: Imagem;
  instituicao: Instituicao;

  idContentUser: number;
  idRole: number;
  idUserProfile: number;
  idCidade: number;
  idEndereco: number;
  idEstado: number;
  idUserImage: number;
  idInstituicao: number;
  ativo: string;

  contentUserRoles: Array<ContentUserRole>;
  contentUsers: Array<ContentUser>;
  enderecos: Array<Endereco>;
  cidades: Array<Cidade>;
  estados: Array<Estado>;
  enderecoForm: FormGroup;
  contentUserForm: FormGroup;
  roleForm: FormGroup;
  instituicaoForm: FormGroup;
  imagemForm: FormGroup;

  protected route: ActivatedRoute;
  protected router: Router;

  constructor(
    private contentUserService: ContentUserService,
    private contentUserRoleService: ContentUserRoleService,
    private userProfileService: UserProfileService,
    private enderecoService: EnderecoService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private imagemService: ImagemService,
    private instituicaoService: InstituicaoService,
    protected injector: Injector,

    ) {

      super(injector, new UserProfile(), userProfileService, UserProfile.fromJson);

    }
    ngOnInit() {
      this.loadContentUserRoles();


      console.log("currentAction ==> "+ this.setCurrentAction());
      console.log("path ==> "+ this.route.snapshot.url[0].path);
      console.log("userProfile ==> "+ this.userProfile);
      console.log("enderecoForm ==> "+ this.enderecoForm);
     // console.log("resposta do formulario resourceForm ===> "+JSON.stringify(this.resourceForm.value));
      super.ngOnInit();

    }



    protected buildResourceForm(){
      this.resourceForm = this.formBuilder.group({


          primeiroNome:[null],
          sobrenome:[null],
          login:[null],
          ptafSenha:[null],
          telefone:[null],
          cpf:[null],
          email:[null],
          endereco: this.enderecoForm

        //name:[null, [Validators.required, Validators.minLength(2)]], // define q o campo é obrigatório e q tenha no mínimo 2 caracteres

      }),

      this.enderecoForm = this.formBuilder.group({

          rua: [],
          numero: [],
          complemento: [],
          cep: [],
          bairro: [],
          idCidade:[],

      }),

      this.contentUserForm = this.formBuilder.group({
        id:[],
        idContentUser:[],
        idContentUserRole:[],
        idUserProfile:this.resourceForm,
        active:['S']

      }),

      this.instituicaoForm = this.formBuilder.group({
        id:[],
        name:[],
        idTipoInsituicao:[],
        idEndereco:[],
        cnpj:[]

      }),

      this.imagemForm = this.formBuilder.group({
        id:[],
        nome:[],
        type:[],
        url:[],
        size:[]

      }),

      this.roleForm = this.formBuilder.group({
        id:[],
        description:[],
        active:[SVGAnimatedAngle],
        url:[],
        size:[]

      })

    }

    protected creationPageTitle(): string{
      return "Cadastro de novo usuário";
    }

    protected editionPageTitle(): string{
      const contentUserName = this.resource.id|| "";
      return "Editando usuário: " + contentUserName;
    }



    protected loadContentUserRoles(){
      this.contentUserRoleService.getAll().subscribe(
        contentUserRole => this.contentUserRoles = contentUserRole
      );
    }


    protected loadEstados(){
      this.estadoService.getAll().subscribe(
        estados => this.estados = estados
      );
    }

    protected loadCidades(idEstado: number){
      this.cidadeService.getAll().subscribe(
        cidades => this.cidades = cidades
      );
    }


}
