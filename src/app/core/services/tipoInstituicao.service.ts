import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TipoInstituicao } from '../models';

@Injectable({
  providedIn: 'root'
})

export class TipoInstituicaoService {

  url = 'https://portal-taf.herokuapp.com/api/tiposInstituicoes';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os TipoInstituicaos
  getTipoInstituicaos(): Observable<TipoInstituicao[]> {
    return this.httpClient.get<TipoInstituicao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um TipoInstituicao pelo id
  getTipoInstituicaoById(id: number): Observable<TipoInstituicao> {
    return this.httpClient.get<TipoInstituicao>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um TipoInstituicao
  saveTipoInstituicao(TipoInstituicao: TipoInstituicao): Observable<TipoInstituicao> {
    return this.httpClient.post<TipoInstituicao>(this.url, JSON.stringify(TipoInstituicao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um TipoInstituicao
  updateTipoInstituicao(TipoInstituicao: TipoInstituicao): Observable<TipoInstituicao> {
    return this.httpClient.put<TipoInstituicao>(this.url + '/' + TipoInstituicao.id, JSON.stringify(TipoInstituicao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um TipoInstituicao
  deleteTipoInstituicao(TipoInstituicao: TipoInstituicao) {
    return this.httpClient.delete<TipoInstituicao>(this.url + '/' + TipoInstituicao.id, this.httpOptions)
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
