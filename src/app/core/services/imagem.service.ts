import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Imagem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ImagemService {

  url = 'https://portal-taf.herokuapp.com/api/userProfile/foto';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Imagems
  getImagems(): Observable<Imagem[]> {
    return this.httpClient.get<Imagem[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Imagem pelo id
  getImagemById(id: number): Observable<Imagem> {
    return this.httpClient.get<Imagem>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Imagem
  saveImagem(Imagem: Imagem): Observable<Imagem> {
    return this.httpClient.post<Imagem>(this.url, JSON.stringify(Imagem), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Imagem
  updateImagem(Imagem: Imagem): Observable<Imagem> {
    return this.httpClient.put<Imagem>(this.url + '/' + Imagem.id, JSON.stringify(Imagem), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Imagem
  deleteImagem(Imagem: Imagem) {
    return this.httpClient.delete<Imagem>(this.url + '/' + Imagem.id, this.httpOptions)
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
