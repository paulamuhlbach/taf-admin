import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { Instituicao } from '../model';

@Injectable({
  providedIn: 'root'
})

export class InstituicaoService extends BaseResourceService<Instituicao> {

  constructor(
    protected injector: Injector,
    ) {
      super("instituicoes", injector, Instituicao.fromJson)
  }

}
