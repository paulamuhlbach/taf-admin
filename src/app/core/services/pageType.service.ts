import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PageType } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageTypeService {

  url = 'https://portal-taf.herokuapp.com/api/pageTypes';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os PageTypes
  getPageTypes(): Observable<PageType[]> {
    return this.httpClient.get<PageType[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um PageType pelo id
  getPageTypeById(id: number): Observable<PageType> {
    return this.httpClient.get<PageType>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um PageType
  savePageType(PageType: PageType): Observable<PageType> {
    return this.httpClient.post<PageType>(this.url, JSON.stringify(PageType), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um PageType
  updatePageType(PageType: PageType): Observable<PageType> {
    return this.httpClient.put<PageType>(this.url + '/' + PageType.id, JSON.stringify(PageType), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um PageType
  deletePageType(PageType: PageType) {
    return this.httpClient.delete<PageType>(this.url + '/' + PageType.id, this.httpOptions)
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
