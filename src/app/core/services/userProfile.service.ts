import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  url = 'https://portal-taf.herokuapp.com/api/userProfiles';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os UserProfiles
  getUserProfiles(): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um UserProfile pelo id
  getUserProfileById(id: number): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um UserProfile
  saveUserProfile(UserProfile: UserProfile): Observable<UserProfile> {
    return this.httpClient.post<UserProfile>(this.url, JSON.stringify(UserProfile), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um UserProfile
  updateUserProfile(UserProfile: UserProfile): Observable<UserProfile> {
    return this.httpClient.put<UserProfile>(this.url + '/' + UserProfile.id, JSON.stringify(UserProfile), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um UserProfile
  deleteUserProfile(UserProfile: UserProfile) {
    return this.httpClient.delete<UserProfile>(this.url + '/' + UserProfile.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
