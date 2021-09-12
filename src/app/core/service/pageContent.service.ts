import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { PageContent } from '../model';

@Injectable({
  providedIn: 'root'
})

export class PageContentService extends BaseResourceService<PageContent> {

  constructor(
    protected injector: Injector,
    ) {
      super("pageContents", injector, PageContent.fromJson)
  }

}
