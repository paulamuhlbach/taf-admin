import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PageContent } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageContentService {

  url = 'https://portal-taf.herokuapp.com/api/pageContents';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os PageContents
  getPageContents(): Observable<PageContent[]> {
    return this.httpClient.get<PageContent[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um PageContent pelo id
  getPageContentById(id: number): Observable<PageContent> {
    return this.httpClient.get<PageContent>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um PageContent
  savePageContent(PageContent: PageContent): Observable<PageContent> {
    return this.httpClient.post<PageContent>(this.url, JSON.stringify(PageContent), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um PageContent
  updatePageContent(PageContent: PageContent): Observable<PageContent> {
    return this.httpClient.put<PageContent>(this.url + '/' + PageContent.id, JSON.stringify(PageContent), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um PageContent
  deletePageContent(PageContent: PageContent) {
    return this.httpClient.delete<PageContent>(this.url + '/' + PageContent.id, this.httpOptions)
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
