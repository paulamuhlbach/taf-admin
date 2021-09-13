import { BaseResourceModel } from './base-resource.model';

import { Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from "rxjs/operators";

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  readonly apiURL : string;

   constructor(

       protected apiPath: string,
       protected injector: Injector,
       protected jsonDataToResourceFn: (jsonData: any)=>T
       ){

       //this.apiURL == 'https://portal-taf.herokuapp.com/';
       this.apiURL == 'http://localhost:5000/';
       this.http = injector.get(HttpClient);
   }


   getAll(): Observable<T[]> {
      const url = `${this.apiURL}/${this.apiPath}`;

       return this.http.get(url).pipe(
         map(this.jsonDataToResources.bind(this)),
         catchError(this.handleError)

       )
     }

     getById(id: number): Observable<T> {
       const url = `${this.apiPath}/${id}`;

       return this.http.get(url).pipe(
           map(this.jsonDataToResource.bind(this)),
           catchError(this.handleError)

       )
     }

     create(resource: T): Observable<T> {
       return this.http.post(this.apiPath, resource).pipe(
           map(this.jsonDataToResource.bind(this)),
           catchError(this.handleError)

         )
     }

     update(resource: T): Observable<T> {
       const url = `${this.apiPath}/${resource.id}`;
       return this.http.put(url, resource).pipe(
           map(() => resource),
           catchError(this.handleError)

       )
     }

     delete(id:number): Observable<any> {
       const url = `${this.apiPath}/${id}`;
       return this.http.delete(url).pipe(
           map(() => null),
           catchError(this.handleError),

       )
     }


 //métodos protegidos - protected methods

 protected jsonDataToResources(jsonData: any[]): T[]{
   const resources: T[] = [];
   jsonData.forEach(
       element => resources.push( this.jsonDataToResourceFn(element) )
       );
   return resources;
 }

 protected jsonDataToResource(jsonData: any): T{
   return this.jsonDataToResourceFn(jsonData);
 }

 protected handleError(error: any): Observable<any>{
   console.log("ERRO NA REQUISIÇÃO => ", error);
   return throwError(error);
 }
}

