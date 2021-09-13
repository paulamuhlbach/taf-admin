import { BaseResourceModel } from '../base-resource';

export class Imagem extends BaseResourceModel{
  constructor(

    public id?: number,
    public filename?: string,
    public mimetype?: string,
    public file?: string,
    public urlFile?: string

  ){
    super();
    }
    static fromJson(jsonData: any): Imagem{
        return Object.assign(new Imagem(), jsonData);
    }
}
