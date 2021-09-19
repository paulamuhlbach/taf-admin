import { Injectable, Injector, Inject } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, flatMap, map } from "rxjs/operators";
import { BaseResourceService } from '../base-resource';
import { InstituicaoService } from './instituicao.service';
import { EnderecoService } from './endereco.service';
import { ImagemService } from './imagem.service';
import { UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService extends BaseResourceService<UserProfile> {

    constructor(
      protected injector: Injector,
      protected enderecoService: EnderecoService,
      protected imagemService: ImagemService,
      protected instituicaoService: InstituicaoService
      ) {
        super("userProfiles", injector, UserProfile.fromJson)
    }

    create(userProfile: UserProfile): Observable<UserProfile> {
      return this.setEnderecoAndSendToServer(userProfile, super.create.bind(this)),
             this.setImagemAndSendToServer(userProfile, super.create.bind(this)),
             this.setInstituicaoAndSendToServer(userProfile, super.create.bind(this))
    }

    update(userProfile: UserProfile): Observable<UserProfile> {

      return this.setEnderecoAndSendToServer(userProfile, super.update.bind(this)),
             this.setImagemAndSendToServer(userProfile, super.update.bind(this)),
             this.setInstituicaoAndSendToServer(userProfile, super.update.bind(this))
    }

    private setEnderecoAndSendToServer(userProfile: UserProfile, sendFn: any): Observable<UserProfile>{
      return this.enderecoService.getById(userProfile.idEndereco).pipe(
        flatMap(endereco => {
          userProfile.endereco = endereco;
          return sendFn(userProfile)
        }),
        catchError(this.handleError)
      );
    }

    private setImagemAndSendToServer(userProfile: UserProfile, sendFn: any): Observable<UserProfile>{
      return this.imagemService.getImagemById(userProfile.idUserImage).pipe(
        flatMap(userImage => {
          userProfile.userImage = userImage;
          return sendFn(userProfile)
        }),
        catchError(this.handleError)
      );
    }

    private setInstituicaoAndSendToServer(userProfile: UserProfile, sendFn: any): Observable<UserProfile>{
      return this.instituicaoService.getById(userProfile.idInstituicao).pipe(
        flatMap(instituicao => {
          userProfile.instituicao = instituicao;
          return sendFn(userProfile)
        }),
        catchError(this.handleError)
      );
    }
  }

