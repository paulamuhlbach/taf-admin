import { BaseResourceModel } from '../base-resource';

export class ContentUserRole extends BaseResourceModel{
  constructor(

    public id?: number,
    public description?: string,
    public active?: string

  ){
    super();
    }
    static fromJson(jsonData: any): ContentUserRole{
        return Object.assign(new ContentUserRole(), jsonData);
    }
}
