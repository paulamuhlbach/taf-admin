import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { Imagem } from '../model';

@Injectable({
  providedIn: 'root'
})

export class ImagemService extends BaseResourceService<Imagem> {

  constructor(
    protected injector: Injector,
    ) {
      super("imagens", injector, Imagem.fromJson)
  }

}
