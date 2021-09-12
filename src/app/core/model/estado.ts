import { BaseResourceModel } from '../base-resource';

export class Estado extends BaseResourceModel{
  constructor(

    public id?: number,
    public nome?: string,
    public sigla?: string

  ){
    super();
    }
    static fromJson(jsonData: any): Estado{
        return Object.assign(new Estado(), jsonData);
    }
}
