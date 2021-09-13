import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Endereco } from '../models';

@Injectable({
  providedIn: 'root'
})

export class EnderecoService {

  url = 'https://portal-taf.herokuapp.com/api/enderecos';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Enderecos
  getEnderecos(): Observable<Endereco[]> {
    return this.httpClient.get<Endereco[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Endereco pelo id
  getEnderecoById(id: number): Observable<Endereco> {
    return this.httpClient.get<Endereco>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Endereco
  saveEndereco(Endereco: Endereco): Observable<Endereco> {
    return this.httpClient.post<Endereco>(this.url, JSON.stringify(Endereco), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Endereco
  updateEndereco(Endereco: Endereco): Observable<Endereco> {
    return this.httpClient.put<Endereco>(this.url + '/' + Endereco.id, JSON.stringify(Endereco), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Endereco
  deleteEndereco(Endereco: Endereco) {
    return this.httpClient.delete<Endereco>(this.url + '/' + Endereco.id, this.httpOptions)
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
