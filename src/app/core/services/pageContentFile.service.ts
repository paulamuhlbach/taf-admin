import { Injectable, Injector, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, flatMap, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { PageContentService } from './pageContent.service';
import { PageContentFile } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PageContentFileService{

  url = 'https://portal-taf.herokuapp.com/api/pageContentFiles/content';
  urlPost = 'https://portal-taf.herokuapp.com/api/upload/pageContentFiles/content';

   // injetando o HttpClient
   constructor(
     private httpClient: HttpClient,
     private pageContentService: PageContentService,
     private pageContentFileService: PageContentFileService) {

   }

  create(pageContentFile: PageContentFile): Observable<PageContentFile> {
    return this.setPageContentAndSendToServer(pageContentFile, this.createFile.bind(this))

  }

  update(pageContentFile: PageContentFile): Observable<PageContentFile> {

    return this.setPageContentAndSendToServer(pageContentFile, this.updateFile.bind(this))
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os PageContentFiles
  get(): Observable<PageContentFile[]> {
    return this.httpClient.get<PageContentFile[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um PageContentFile pelo id
  getById(id: number): Observable<PageContentFile> {
    return this.httpClient.get<PageContentFile>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um PageContentFile
  createFile(file: PageContentFile): Observable<PageContentFile> {
    return this.httpClient.post<PageContentFile>(this.urlPost, JSON.stringify(file), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um PageContentFile
  updateFile(file: PageContentFile): Observable<PageContentFile> {
    return this.httpClient.put<PageContentFile>(this.urlPost + '/' + file.id, JSON.stringify(file), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um PageContentFile
  deleteFile(file: PageContentFile) {
    return this.httpClient.delete<PageContentFile>(this.url + '/' + file.id, this.httpOptions)
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

  private setPageContentAndSendToServer(pageContentFile: PageContentFile, sendFn: any): Observable<PageContentFile>{
    return this.pageContentService.getById(pageContentFile.idPageContent).pipe(
      flatMap(pageContent => {
        pageContentFile.pageContent = pageContent;
        return sendFn(pageContent)
      }),
      catchError(this.handleError)
    );
  }

}
