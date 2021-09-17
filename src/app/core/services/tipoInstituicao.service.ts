import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from '../base-resource';
import { TipoInstituicao } from '../models';

@Injectable({
  providedIn: 'root'
})

export class TipoInstituicaoService extends BaseResourceService<TipoInstituicao> {

    constructor(
      protected injector: Injector,
      ) {
        super("tiposInstituicoes", injector, TipoInstituicao.fromJson)
    }
}
