import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";

import { BaseResourceService } from '../base-resource';
import { MenuGroupService } from './menuGroup.service';
import { ContentUserService } from './contentUser.service';
import { Menu } from '../models';

@Injectable({
  providedIn: 'root'
})

export class MenuService extends BaseResourceService<Menu>{

  constructor(
    protected injector: Injector,
    private menuGroupService: MenuGroupService,
    private contentUserService: ContentUserService
    ) {
      super("menus", injector, Menu.fromJson)
  }

  create(menu: Menu): Observable<Menu> {
    return this.setMenuGroupAndSendToServer(menu, super.create.bind(this)),
           this.setUserCreatedAndSendToServer(menu, super.create.bind(this)),
           this.setUserModifyAndSendToServer(menu, super.create.bind(this))

  }

  update(menu: Menu): Observable<Menu> {

    return this.setMenuGroupAndSendToServer(menu, super.update.bind(this)),
           this.setUserCreatedAndSendToServer(menu, super.update.bind(this)),
           this.setUserModifyAndSendToServer(menu, super.update.bind(this))
        }

  private setMenuGroupAndSendToServer(menu: Menu, sendFn: any): Observable<Menu>{
    return this.menuGroupService.getById(menu.idMenuGroup).pipe(
      flatMap(menuGroup => {
        menu.menuGroup = menuGroup;
        return sendFn(menu)
      }),
      catchError(this.handleError)
    );


  }

  private setUserCreatedAndSendToServer(menu: Menu, sendFn: any): Observable<Menu>{
    return this.contentUserService.getById(menu.idUserCreated).pipe(
      flatMap(userCreated => {
        menu.userCreated = userCreated;
        return sendFn(menu)
      }),
      catchError(this.handleError)
    );

 }

 private setUserModifyAndSendToServer(menu: Menu, sendFn: any): Observable<Menu>{
  return this.contentUserService.getById(menu.idUserModify).pipe(
    flatMap(userModify => {
      menu.userModify = userModify;
      return sendFn(menu)
    }),
    catchError(this.handleError)
  );
 }
}
