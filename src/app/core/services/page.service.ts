import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  url = 'https://portal-taf.herokuapp.com/api/pages';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Pages
  getPages(): Observable<Page[]> {
    return this.httpClient.get<Page[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Page pelo id
  getPageById(id: number): Observable<Page> {
    return this.httpClient.get<Page>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Page
  savePage(Page: Page): Observable<Page> {
    return this.httpClient.post<Page>(this.url, JSON.stringify(Page), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Page
  updatePage(Page: Page): Observable<Page> {
    return this.httpClient.put<Page>(this.url + '/' + Page.id, JSON.stringify(Page), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Page
  deletePage(Page: Page) {
    return this.httpClient.delete<Page>(this.url + '/' + Page.id, this.httpOptions)
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
