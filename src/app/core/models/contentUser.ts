import { BaseResourceModel } from '../base-resource';
import { ContentUserRole, UserProfile } from '.';

export class ContentUser extends BaseResourceModel{
  constructor(

    public id?: number,
    public idContentUserRole?: number,
    public idUserProfile?: number,
    public createdIn?: string,
    public lastModify?: string,
    public active?: string,
    public contentUserRole?: ContentUserRole,
    public userProfile?: UserProfile

  ){
    super();
    }
    static fromJson(jsonData: any): ContentUser{
        return Object.assign(new ContentUser(), jsonData);
    }
}
