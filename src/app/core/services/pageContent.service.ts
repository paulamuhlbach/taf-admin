import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";

import { BaseResourceService } from '../base-resource';
import { ContentUserService } from './contentUser.service';
import { PageService } from './page.service';
import { PageContent } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageContentService extends BaseResourceService<PageContent>{

  constructor(
    protected injector: Injector,
    private contentUserService: ContentUserService,
    private pageService: PageService
    ) {
      super("pageContents", injector, PageContent.fromJson)
  }

  create(pageContent: PageContent): Observable<PageContent> {
    return this.setPagedAndSendToServer(pageContent, super.create.bind(this)),
           this.setUserCreatedAndSendToServer(pageContent, super.create.bind(this)),
           this.setUserApprovedAndSendToServer(pageContent, super.create.bind(this)),
           this.setUserModifyAndSendToServer(pageContent, super.create.bind(this)),
           this.setUserPublishAndSendToServer(pageContent, super.create.bind(this))

  }

  update(pageContent: PageContent): Observable<PageContent> {

    return this.setPagedAndSendToServer(pageContent, super.update.bind(this)),
           this.setUserCreatedAndSendToServer(pageContent, super.update.bind(this)),
           this.setUserApprovedAndSendToServer(pageContent, super.update.bind(this)),
           this.setUserModifyAndSendToServer(pageContent, super.update.bind(this)),
           this.setUserPublishAndSendToServer(pageContent, super.update.bind(this))
  }

  private setPagedAndSendToServer(pageContent: PageContent, sendFn: any): Observable<PageContent>{
    return this.pageService.getById(pageContent.idPage).pipe(
      flatMap(page => {
        pageContent.page = page;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }


  private setUserApprovedAndSendToServer(pageContent: PageContent, sendFn: any): Observable<PageContent>{
    return this.contentUserService.getById(pageContent.idUserApproved).pipe(
      flatMap(userApproved => {
        pageContent.userApproved = userApproved;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }

  private setUserCreatedAndSendToServer(pageContent: PageContent, sendFn: any): Observable<PageContent>{
    return this.contentUserService.getById(pageContent.idUserCreated).pipe(
      flatMap(userCreated => {
        pageContent.userCreated = userCreated;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }

  private setUserModifyAndSendToServer(pageContent: PageContent, sendFn: any): Observable<PageContent>{
    return this.contentUserService.getById(pageContent.idUserModify).pipe(
      flatMap(userModify => {
        pageContent.userModify = userModify;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }

  private setUserPublishAndSendToServer(pageContent: PageContent, sendFn: any): Observable<PageContent>{
    return this.contentUserService.getById(pageContent.idUserPublish).pipe(
      flatMap(userPublish => {
        pageContent.userPublish = userPublish;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }


}
