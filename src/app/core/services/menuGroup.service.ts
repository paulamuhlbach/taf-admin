import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MenuGroup } from '../models';

@Injectable({
  providedIn: 'root'
})

export class MenuGroupService {

  url = 'https://portal-taf.herokuapp.com/api/menuGroups';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os MenuGroups
  getMenuGroups(): Observable<MenuGroup[]> {
    return this.httpClient.get<MenuGroup[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um MenuGroup pelo id
  getMenuGroupById(id: number): Observable<MenuGroup> {
    return this.httpClient.get<MenuGroup>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um MenuGroup
  saveMenuGroup(MenuGroup: MenuGroup): Observable<MenuGroup> {
    return this.httpClient.post<MenuGroup>(this.url, JSON.stringify(MenuGroup), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um MenuGroup
  updateMenuGroup(MenuGroup: MenuGroup): Observable<MenuGroup> {
    return this.httpClient.put<MenuGroup>(this.url + '/' + MenuGroup.id, JSON.stringify(MenuGroup), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um MenuGroup
  deleteMenuGroup(MenuGroup: MenuGroup) {
    return this.httpClient.delete<MenuGroup>(this.url + '/' + MenuGroup.id, this.httpOptions)
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
