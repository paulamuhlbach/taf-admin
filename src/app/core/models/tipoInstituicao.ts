import { BaseResourceModel } from '../base-resource';

export class TipoInstituicao extends BaseResourceModel{
  constructor(

    public id?: number,
    public descricao?: string

  ){
    super();
    }
    static fromJson(jsonData: any): TipoInstituicao{
        return Object.assign(new TipoInstituicao(), jsonData);
    }
}
