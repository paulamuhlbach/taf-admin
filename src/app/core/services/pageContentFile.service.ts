import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PageContentFile } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageContentFileService {

  url = 'https://portal-taf.herokuapp.com/api/pageContentFiles';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os PageContentFiles
  getPageContentFiles(): Observable<PageContentFile[]> {
    return this.httpClient.get<PageContentFile[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um PageContentFile pelo id
  getPageContentFileById(id: number): Observable<PageContentFile> {
    return this.httpClient.get<PageContentFile>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um PageContentFile
  savePageContentFile(PageContentFile: PageContentFile): Observable<PageContentFile> {
    return this.httpClient.post<PageContentFile>(this.url, JSON.stringify(PageContentFile), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um PageContentFile
  updatePageContentFile(PageContentFile: PageContentFile): Observable<PageContentFile> {
    return this.httpClient.put<PageContentFile>(this.url + '/' + PageContentFile.id, JSON.stringify(PageContentFile), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um PageContentFile
  deletePageContentFile(PageContentFile: PageContentFile) {
    return this.httpClient.delete<PageContentFile>(this.url + '/' + PageContentFile.id, this.httpOptions)
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
