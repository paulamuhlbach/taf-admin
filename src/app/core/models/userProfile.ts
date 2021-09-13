import { BaseResourceModel } from '../base-resource';
import { Endereco, Imagem, Instituicao } from '.';

export class UserProfile extends BaseResourceModel{
  constructor(

    public id?: number,
    public primeiroNome?: string,
    public sobrenome?: string,
    public login?: string,
    public ptafSenha?: string,
    public idImage?: number,
    public idEndereco?: number,
    public telefone?: string,
    public idInstituicao?: number,
    public cpf?: string,
    public email?: string,
    public imagem?: Imagem,
    public endereco?: Endereco,
    public instituicao?: Instituicao

  ){
    super();
    }
    static fromJson(jsonData: any): UserProfile{
        return Object.assign(new UserProfile(), jsonData);
    }
}
