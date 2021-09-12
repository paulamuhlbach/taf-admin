import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { PageContentFile } from '../model';

@Injectable({
  providedIn: 'root'
})

export class PageContentFileService extends BaseResourceService<PageContentFile> {

  constructor(
    protected injector: Injector,
    ) {
      super("pageContentFiles", injector, PageContentFile.fromJson)
  }

}
