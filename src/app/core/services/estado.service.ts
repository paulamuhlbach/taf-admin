import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from '../base-resource';
import { Estado } from '../models';

@Injectable({
  providedIn: 'root'
})

export class EstadoService extends BaseResourceService<Estado>{

  constructor(
    protected injector: Injector,
    ) {
      super("estados", injector, Estado.fromJson)
  }
}
