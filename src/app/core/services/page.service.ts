import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from '../base-resource';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageService extends BaseResourceService<Page>{

  constructor(
    protected injector: Injector,
    ) {
      super("pages", injector, Page.fromJson)
  }

}
