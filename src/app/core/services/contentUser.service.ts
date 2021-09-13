import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ContentUser } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ContentUserService {

  url = 'https://portal-taf.herokuapp.com/api/contentUsers';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os ContentUsers
  getContentUsers(): Observable<ContentUser[]> {
    return this.httpClient.get<ContentUser[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um ContentUser pelo id
  getContentUserById(id: number): Observable<ContentUser> {
    return this.httpClient.get<ContentUser>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um ContentUser
  saveContentUser(ContentUser: ContentUser): Observable<ContentUser> {
    return this.httpClient.post<ContentUser>(this.url, JSON.stringify(ContentUser), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um ContentUser
  updateContentUser(ContentUser: ContentUser): Observable<ContentUser> {
    return this.httpClient.put<ContentUser>(this.url + '/' + ContentUser.id, JSON.stringify(ContentUser), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um ContentUser
  deleteContentUser(ContentUser: ContentUser) {
    return this.httpClient.delete<ContentUser>(this.url + '/' + ContentUser.id, this.httpOptions)
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
