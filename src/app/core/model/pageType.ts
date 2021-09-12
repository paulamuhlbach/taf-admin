import { BaseResourceModel } from '../base-resource';
import { ContentUser } from './';

export class PageType extends BaseResourceModel{
  constructor(

    public id?: number,
    public description?: string,
    public idUserCreated?: number,
    public idUserModify?: number,
    public createdIn?: string,
    public lastModify?: string,
    public actve?: string,
    public userCreated?: ContentUser,
    public userModify?: ContentUser

  ){
    super();
    }
    static fromJson(jsonData: any): PageType{
        return Object.assign(new PageType(), jsonData);
    }
}
