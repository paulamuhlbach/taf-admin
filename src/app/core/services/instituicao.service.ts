import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Instituicao } from '../models';

@Injectable({
  providedIn: 'root'
})

export class InstituicaoService {

  url = 'https://portal-taf.herokuapp.com/api/instituicoes';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Instituicaos
  getInstituicaos(): Observable<Instituicao[]> {
    return this.httpClient.get<Instituicao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Instituicao pelo id
  getInstituicaoById(id: number): Observable<Instituicao> {
    return this.httpClient.get<Instituicao>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Instituicao
  saveInstituicao(Instituicao: Instituicao): Observable<Instituicao> {
    return this.httpClient.post<Instituicao>(this.url, JSON.stringify(Instituicao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Instituicao
  updateInstituicao(Instituicao: Instituicao): Observable<Instituicao> {
    return this.httpClient.put<Instituicao>(this.url + '/' + Instituicao.id, JSON.stringify(Instituicao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Instituicao
  deleteInstituicao(Instituicao: Instituicao) {
    return this.httpClient.delete<Instituicao>(this.url + '/' + Instituicao.id, this.httpOptions)
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
