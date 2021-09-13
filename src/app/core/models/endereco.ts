import { BaseResourceModel } from '../base-resource';
import { Cidade } from '.';

export class Endereco extends BaseResourceModel{
  constructor(

    public id?: number,
    public rua?: string,
    public numero?: string,
    public complemento?: string,
    public cep?: string,
    public bairro?: string,
    public idCidade?: number,
    public cidade?: Cidade

  ){
    super();
    }
    static fromJson(jsonData: any): Endereco{
        return Object.assign(new Endereco(), jsonData);
    }
}
