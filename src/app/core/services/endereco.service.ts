import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";

import { BaseResourceService } from '../base-resource';
import { CidadeService } from './cidade.service';
import { Endereco } from '../models';

@Injectable({
  providedIn: 'root'
})

export class EnderecoService extends BaseResourceService<Endereco>{

  constructor(
    protected injector: Injector,
    protected cidadeService: CidadeService
    ) {
      super("enderecos", injector, Endereco.fromJson)
  }

  create(endereco: Endereco): Observable<Endereco> {
    return this.setCidadeAndSendToServer(endereco, super.create.bind(this))

  }

  update(endereco: Endereco): Observable<Endereco> {

    return this.setCidadeAndSendToServer(endereco, super.update.bind(this))
  }

  private setCidadeAndSendToServer(endereco: Endereco, sendFn: any): Observable<Endereco>{
    return this.cidadeService.getById(endereco.idCidade).pipe(
      flatMap(cidade => {
        endereco.cidade = cidade;
        return sendFn(endereco)
      }),
      catchError(this.handleError)
    );
  }
}
