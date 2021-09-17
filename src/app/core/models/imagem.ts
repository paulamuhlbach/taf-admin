import { BaseResourceModel } from '../base-resource';

export class Imagem extends BaseResourceModel{
  constructor(

    public id?: number,
    public name?: string,
    public url?: string,
    public type?: string,
    public size?: number

  ){
    super();
    }
    static fromJson(jsonData: any): Imagem{
        return Object.assign(new Imagem(), jsonData);
    }
}
