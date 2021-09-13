import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ContentUserRole } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ContentUserRoleService {

  url = 'https://portal-taf.herokuapp.com/api/contentUserRoles';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os ContentUserRoles
  getContentUserRoles(): Observable<ContentUserRole[]> {
    return this.httpClient.get<ContentUserRole[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um ContentUserRole pelo id
  getContentUserRoleById(id: number): Observable<ContentUserRole> {
    return this.httpClient.get<ContentUserRole>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um ContentUserRole
  saveContentUserRole(ContentUserRole: ContentUserRole): Observable<ContentUserRole> {
    return this.httpClient.post<ContentUserRole>(this.url, JSON.stringify(ContentUserRole), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um ContentUserRole
  updateContentUserRole(ContentUserRole: ContentUserRole): Observable<ContentUserRole> {
    return this.httpClient.put<ContentUserRole>(this.url + '/' + ContentUserRole.id, JSON.stringify(ContentUserRole), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um ContentUserRole
  deleteContentUserRole(ContentUserRole: ContentUserRole) {
    return this.httpClient.delete<ContentUserRole>(this.url + '/' + ContentUserRole.id, this.httpOptions)
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
