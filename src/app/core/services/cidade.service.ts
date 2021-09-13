import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cidade } from '../models';

@Injectable({
  providedIn: 'root'
})

export class CidadeService {

  url = 'https://portal-taf.herokuapp.com/api/cidades';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Cidades
  getCidades(): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Cidade pelo id
  getCidadeById(id: number): Observable<Cidade> {
    return this.httpClient.get<Cidade>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Cidade
  saveCidade(Cidade: Cidade): Observable<Cidade> {
    return this.httpClient.post<Cidade>(this.url, JSON.stringify(Cidade), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Cidade
  updateCidade(Cidade: Cidade): Observable<Cidade> {
    return this.httpClient.put<Cidade>(this.url + '/' + Cidade.id, JSON.stringify(Cidade), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Cidade
  deleteCidade(Cidade: Cidade) {
    return this.httpClient.delete<Cidade>(this.url + '/' + Cidade.id, this.httpOptions)
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
