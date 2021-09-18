import { OnInit, Inject, Injector, Injectable} from '@angular/core';
import { BaseResourceModel } from './base-resource.model';
import { BaseResourceService } from './base-resource.service';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseResourceFormModalComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  currentAction: string; // edit ou new
  idResource: number;
  form: FormGroup;
  serverErrorMessages: string[] = null; // mensagens retornadas do servidor
  submittingForm = false; // para evitar várias submissões seguidas

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  //protected toastr: ToastrService;

  constructor(
    // injeção de dependências
    protected injector: Injector,
    @Inject(BaseResourceModel) public resource: T, // exemplo -> isso pode virar um new category()
    protected resourceService: BaseResourceService<T>,
    @Inject(BaseResourceModel) protected jsonDataToResourceFn: (jsonData) => T ,  // função recebe um jsonData e transforma em tipo T
    @Inject(DOCUMENT) protected document: Document, // pra fazer o reload da página depois do submmit
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.buildResourceForm();
  }

  submitForm() {
    this.submittingForm = true; // desbloqueia o botão para submissão do formulário

    if (this.currentAction === 'new') {
      this.create();
    } else {
      // currentAction == "edit"
      this.update();
    }
  }

  private update() {
    const resource: T = this.jsonDataToResourceFn(this.form.value);

    this.resourceService.update(resource)
       .subscribe(
         // tslint:disable-next-line: no-shadowed-variable
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
       );
  }

  private create() {
    // cria um objeto novo e pega os valores informados no formulário
    const resource: T = this.jsonDataToResourceFn(this.form.value);

    this.resourceService.create(resource)
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        resource  => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );

  }

  private actionsForSuccess(resource: T) {
    //this.toastr.success('Solicitação processada com sucesso');
    this.document.location.reload();

  }

  private actionsForError(error) {
    //this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false; // para não submeter o formulário

    if (error.status === 442) {
        this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
        this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }

  }

  protected abstract buildResourceForm(): void;
}

