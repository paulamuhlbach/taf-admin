import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Menu } from '../models';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  url = 'https://portal-taf.herokuapp.com/api/menus';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os Menus
  getMenus(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Menu pelo id
  getMenuById(id: number): Observable<Menu> {
    return this.httpClient.get<Menu>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Menu
  saveMenu(Menu: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(this.url, JSON.stringify(Menu), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Menu
  updateMenu(Menu: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(this.url + '/' + Menu.id, JSON.stringify(Menu), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Menu
  deleteMenu(Menu: Menu) {
    return this.httpClient.delete<Menu>(this.url + '/' + Menu.id, this.httpOptions)
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
