import { BaseResourceModel } from '../base-resource';
import { ContentUser, Page } from '.';

export class PageContent extends BaseResourceModel{
  constructor(

    public id?: number,
    public idPage?: number,
    public title?: string,
    public content?: string,
    public idUserCreated?: number,
    public idUserModify?: number,
    public idUserApproved?: number,
    public idUserPublish?: number,
    public createdIn?: string,
    public lastModify?: string,
    public approved?: string,
    public approvedIn?: string,
    public publish?: string,
    public publishIn?: string,
    public page?: Page,
    public userCreated?: ContentUser,
    public userModify?: ContentUser,
    public userApproved?: ContentUser,
    public userPublish?: ContentUser

  ){
    super();
    }
    static fromJson(jsonData: any): PageContent{
        return Object.assign(new PageContent(), jsonData);
    }
}
