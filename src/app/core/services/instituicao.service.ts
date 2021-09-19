import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";

import { BaseResourceService } from '../base-resource';
import { TipoInstituicaoService } from './tipoInstituicao.service';
import { EnderecoService } from './endereco.service';
import { Instituicao } from '../models';



@Injectable({
  providedIn: 'root'
})

export class InstituicaoService extends BaseResourceService<Instituicao>{

  constructor(
    protected injector: Injector,
    protected tipoInstituicaoService: TipoInstituicaoService,
    protected enderecoService: EnderecoService
    ) {
      super("instituicoes", injector, Instituicao.fromJson)
  }

  create(instituicao: Instituicao): Observable<Instituicao> {
    return this.setTipoInstituicaoAndSendToServer(instituicao, super.create.bind(this)),
           this.setEnderecoInstituicaoAndSendToServer(instituicao, super.create.bind(this))

  }

  update(instituicao: Instituicao): Observable<Instituicao> {

    return this.setTipoInstituicaoAndSendToServer(instituicao, super.update.bind(this)),
           this.setEnderecoInstituicaoAndSendToServer(instituicao, super.update.bind(this))
  }

  private setTipoInstituicaoAndSendToServer(instituicao: Instituicao, sendFn: any): Observable<Instituicao>{
    return this.tipoInstituicaoService.getById(instituicao.idTipoInstituicao).pipe(
      flatMap(tipoInstituicao => {
        instituicao.tipoInstituicao = tipoInstituicao;
        return sendFn(instituicao)
      }),
      catchError(this.handleError)
    );
  }

  private setEnderecoInstituicaoAndSendToServer(instituicao: Instituicao, sendFn: any): Observable<Instituicao>{
    return this.enderecoService.getById(instituicao.idEndereco).pipe(
      flatMap(endereco => {
        instituicao.endereco = endereco;
        return sendFn(instituicao)
      }),
      catchError(this.handleError)
    );
  }

}
