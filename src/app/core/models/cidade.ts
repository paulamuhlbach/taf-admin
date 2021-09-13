import { BaseResourceModel } from '../base-resource';
import { Estado } from '.';

export class Cidade extends BaseResourceModel{
  constructor(

    public id?: number,
    public nome?: string,
    public idEstado?: number,
    public estado?: Estado

  ){
    super();
    }
    static fromJson(jsonData: any): Cidade{
        return Object.assign(new Cidade(), jsonData);
    }
}
