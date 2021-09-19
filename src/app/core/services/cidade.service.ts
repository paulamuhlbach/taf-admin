import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";
import { BaseResourceService } from '../base-resource';
import { EstadoService } from './estado.service';
import { Cidade } from '../models';


@Injectable({
  providedIn: 'root'
})

export class CidadeService extends BaseResourceService<Cidade>{

  constructor(
    protected injector: Injector,
    protected estadoService: EstadoService
    ) {
      super("cidades", injector, Cidade.fromJson)
  }


  create(cidade: Cidade): Observable<Cidade> {
    return this.setEstadoAndSendToServer(cidade, super.create.bind(this))

  }

  update(cidade: Cidade): Observable<Cidade> {

    return this.setEstadoAndSendToServer(cidade, super.update.bind(this))
  }

  private setEstadoAndSendToServer(cidade: Cidade, sendFn: any): Observable<Cidade>{
    return this.estadoService.getById(cidade.idEstado).pipe(
      flatMap(estado => {
        cidade.estado = estado;
        return sendFn(cidade)
      }),
      catchError(this.handleError)
    );
  }
}
