import { BaseResourceModel } from '../base-resource';
import { ContentUser, MenuGroup } from './';

export class Menu extends BaseResourceModel{
  constructor(

    public id?: number,
    public idMenuGroup?: number,
    public description?: string,
    public level?: number,
    public idUserCreated?: number,
    public idUserModify?: number,
    public createdIn?: string,
    public lastModify?: string,
    public actve?: string,
    public menuGroup?: MenuGroup,
    public userCreated?: ContentUser,
    public userModify?: ContentUser

  ){
    super();
    }
    static fromJson(jsonData: any): Menu{
        return Object.assign(new Menu(), jsonData);
    }
}
