import { ContentUser } from './';
import { BaseResourceModel } from '../base-resource';

export class MenuGroup extends BaseResourceModel{
  constructor(

    public id?: number,
    public groupName?: string,
    public description?: string,
    public level?: string,
    public idSubmenuGroup?: number,
    public idUserCreated?: number,
    public idUserModify?: number,
    public createdIn?: string,
    public lastModify?: string,
    public actve?: string,
    public userCreated?: ContentUser,
    public userModify?: ContentUser,
    public submenuGroup?: MenuGroup


  ){
    super();
    }
    static fromJson(jsonData: any): MenuGroup{
        return Object.assign(new MenuGroup(), jsonData);
    }
}
