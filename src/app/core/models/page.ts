import { BaseResourceModel } from '../base-resource';
import { ContentUser, Imagem, Menu, PageType } from '.';

export class Page extends BaseResourceModel{
  constructor(

    public id?: number,
    public idPageType?: number,
    public title?: string,
    public slug?: string,
    public url?: string,
    public idMenu?: number,
    public idIcon?: number,
    public description?: string,
    public idUserCreated?: number,
    public idUserModify?: number,
    public createdIn?: string,
    public lastModify?: string,
    public actve?: string,
    public pageType?: PageType,
    public menu?: Menu,
    public icone?: Imagem,
    public userCreated?: ContentUser,
    public userModify?: ContentUser

  ){
    super();
    }
    static fromJson(jsonData: any): Page{
        return Object.assign(new Page(), jsonData);
    }
}
