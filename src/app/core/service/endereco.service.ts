import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { Endereco } from '../model';

@Injectable({
  providedIn: 'root'
})

export class EnderecoService extends BaseResourceService<Endereco> {

  constructor(
    protected injector: Injector,
    ) {
      super("enderecos", injector, Endereco.fromJson)
  }

}
