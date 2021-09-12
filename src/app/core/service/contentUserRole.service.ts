import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { ContentUserRole } from '../model';

@Injectable({
  providedIn: 'root'
})

export class ContentUserRoleService extends BaseResourceService<ContentUserRole> {

  constructor(
    protected injector: Injector,
    ) {
      super("contentUserRoles", injector, ContentUserRole.fromJson)
  }

}
