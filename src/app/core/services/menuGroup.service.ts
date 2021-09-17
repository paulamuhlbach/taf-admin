import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from '../base-resource';
import { MenuGroup } from '../models';

@Injectable({
  providedIn: 'root'
})

export class MenuGroupService extends BaseResourceService<MenuGroup>{

  constructor(
    protected injector: Injector,
    ) {
      super("menuGroups", injector, MenuGroup.fromJson)
  }

}
