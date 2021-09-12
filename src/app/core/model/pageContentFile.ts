import { BaseResourceModel } from '../base-resource';
import { PageContent } from './';

export class PageContentFile extends BaseResourceModel{
  constructor(

    public id?: number,
    public idPageContent?: number,
    public filename?: string,
    public mimetype?: string,
    public file?: string,
    public urlFile?: string,
    public page?: PageContent

  ){
    super();
    }
    static fromJson(jsonData: any): PageContentFile{
        return Object.assign(new PageContentFile(), jsonData);
    }
}
