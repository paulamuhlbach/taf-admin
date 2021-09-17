import { Injectable, Injector, Inject } from '@angular/core';

import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";
import { BaseResourceService } from '../base-resource';

import { ContentUserRoleService } from './contentUserRole.service';
import { ContentUser } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ContentUserService extends BaseResourceService<ContentUser> {

  constructor(
    protected injector: Injector,
    private contentUserRoleService: ContentUserRoleService
    ) {
      super("contentUsers", injector, ContentUser.fromJson)
  }

  create(contentUser: ContentUser): Observable<ContentUser> {
    return this.setContentUserRoleAndSendToServer(contentUser, super.create.bind(this))

  }

  update(contentUser: ContentUser): Observable<ContentUser> {

    return this.setContentUserRoleAndSendToServer(contentUser, super.update.bind(this))
  }

  private setContentUserRoleAndSendToServer(contentUser: ContentUser, sendFn: any): Observable<ContentUser>{
    return this.contentUserRoleService.getById(contentUser.idContentUserRole).pipe(
      flatMap(contentUserRole => {
        contentUser.contentUserRole = contentUserRole;
        return sendFn(contentUser)
      }),
      catchError(this.handleError)
    );
  }
}
