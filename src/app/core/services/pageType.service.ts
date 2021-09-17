import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from '../base-resource';
import { PageType } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageTypeService extends BaseResourceService<PageType> {

  constructor(
    protected injector: Injector,
    ) {
      super("pageTypes", injector, PageType.fromJson)
  }
}

