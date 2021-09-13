import { BaseResourceModel } from '../base-resource';
import { TipoInstituicao, Endereco } from '.';

export class Instituicao extends BaseResourceModel{
  constructor(

    public id?: number,
    public nome?: string,
    public idTipoInstituicao?: number,
    public idEndereco?: number,
    public cnpj?: string,
    public tipoInstituicao?: TipoInstituicao,
    public endereco?: Endereco

  ){
    super();
    }
    static fromJson(jsonData: any): Instituicao{
        return Object.assign(new Instituicao(), jsonData);
    }
}
