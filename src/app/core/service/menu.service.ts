import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { Menu } from '../model';

@Injectable({
  providedIn: 'root'
})

export class MenuService extends BaseResourceService<Menu> {

  constructor(
    protected injector: Injector,
    ) {
      super("menus", injector, Menu.fromJson)
  }

}
