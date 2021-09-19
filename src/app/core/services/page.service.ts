import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";

import { BaseResourceService } from '../base-resource';
import { PageTypeService } from './pageType.service';
import { ContentUserService } from './contentUser.service';
import { ImagemService } from './imagem.service';
import { MenuService } from './menu.service';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageService extends BaseResourceService<Page>{

  constructor(
    protected injector: Injector,
    private pageTypeService: PageTypeService,
    private contentUserService: ContentUserService,
    private imageService: ImagemService,
    private menuService: MenuService
    ) {
      super("pages", injector, Page.fromJson)
  }

  create(page: Page): Observable<Page> {
    return this.setPageTypeAndSendToServer(page, super.create.bind(this)),
           this.setMenuAndSendToServer(page, super.create.bind(this)),
           this.setIconAndSendToServer(page, super.create.bind(this)),
           this.setUserCreatedAndSendToServer(page, super.create.bind(this)),
           this.setUserModifyAndSendToServer(page, super.create.bind(this))

  }

  update(page: Page): Observable<Page> {
    return this.setPageTypeAndSendToServer(page, super.update.bind(this)),
           this.setMenuAndSendToServer(page, super.update.bind(this)),
           this.setIconAndSendToServer(page, super.update.bind(this)),
           this.setUserCreatedAndSendToServer(page, super.update.bind(this)),
           this.setUserModifyAndSendToServer(page, super.update.bind(this))
  }

  private setPageTypeAndSendToServer(page: Page, sendFn: any): Observable<Page>{
    return this.pageTypeService.getById(page.idPageType).pipe(
      flatMap(pageType => {
        page.pageType = pageType;
        return sendFn(page)
      }),
      catchError(this.handleError)
    );
  }

  private setMenuAndSendToServer(page: Page, sendFn: any): Observable<Page>{
    return this.menuService.getById(page.idMenu).pipe(
      flatMap(menu => {
        page.menu = menu;
        return sendFn(page)
      }),
      catchError(this.handleError)
    );
  }

  private setIconAndSendToServer(page: Page, sendFn: any): Observable<Page>{
    return this.imageService.getImagemById(page.idIcon).pipe(
      flatMap(icone => {
        page.icone = icone;
        return sendFn(page)
      }),
      catchError(this.handleError)
    );
  }

  //idUserCreated

  private setUserCreatedAndSendToServer(page: Page, sendFn: any): Observable<Page>{
    return this.contentUserService.getById(page.idUserCreated).pipe(
      flatMap(userCreated => {
        page.userCreated = userCreated;
        return sendFn(page)
      }),
      catchError(this.handleError)
    );
  }
  //idUserModify

  private setUserModifyAndSendToServer(page: Page, sendFn: any): Observable<Page>{
    return this.contentUserService.getById(page.idUserModify).pipe(
      flatMap(userModify => {
        page.userModify = userModify;
        return sendFn(page)
      }),
      catchError(this.handleError)
    );
  }

}
