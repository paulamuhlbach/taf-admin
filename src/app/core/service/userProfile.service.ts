import { Injectable, Injector, Inject } from '@angular/core';
import { BaseResourceService } from  '../base-resource';
import { UserProfile } from '../model';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService extends BaseResourceService<UserProfile> {

  constructor(
    protected injector: Injector,
    ) {
      super("userProfiles", injector, UserProfile.fromJson)
  }

}
