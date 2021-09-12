import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { Cidade } from '../model';

@Injectable({
  providedIn: 'root'
})

export class CidadeService extends BaseResourceService<Cidade> {

  constructor(
    protected injector: Injector,
    ) {
      super("cidades", injector, Cidade.fromJson)
  }

}
