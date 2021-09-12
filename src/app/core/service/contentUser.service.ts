import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { ContentUser } from '../model';

@Injectable({
  providedIn: 'root'
})

export class ContentUserService extends BaseResourceService<ContentUser> {

  constructor(
    protected injector: Injector,
    ) {
      super("contentUsers", injector, ContentUser.fromJson)
  }

}
