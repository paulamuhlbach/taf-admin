import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Estado } from '../models';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  url = 'https://portal-taf.herokuapp.com/api/estados';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Estados
  getEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Estado pelo id
  getEstadoById(id: number): Observable<Estado> {
    return this.httpClient.get<Estado>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Estado
  saveEstado(Estado: Estado): Observable<Estado> {
    return this.httpClient.post<Estado>(this.url, JSON.stringify(Estado), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Estado
  updateEstado(Estado: Estado): Observable<Estado> {
    return this.httpClient.put<Estado>(this.url + '/' + Estado.id, JSON.stringify(Estado), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Estado
  deleteEstado(Estado: Estado) {
    return this.httpClient.delete<Estado>(this.url + '/' + Estado.id, this.httpOptions)
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
