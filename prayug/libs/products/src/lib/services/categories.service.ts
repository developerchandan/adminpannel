/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoey } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http:HttpClient ) { }

getCategories(): Observable <Categoey[]>{
  return this.http.get <Categoey[]>('http://localhost:8080/api/v1/categories');
}

getCategory(categoryId:string): Observable <Categoey>{
  return this.http.get <Categoey>(`http://localhost:8080/api/v1/categories/${categoryId}`);
}

createCategory(category:Categoey):Observable <Categoey>{
 return this.http.post <Categoey>('http://localhost:8080/api/v1/categories', category);

}
updateCategory(category:Categoey):Observable <Categoey>{
  return this.http.put <Categoey>('http://localhost:8080/api/v1/categories/'+ category.id,category);
 
 }

deleteCategory(categoryId:String):Observable<Object>{
  return this.http.delete<Object>(`http://localhost:8080/api/v1/categories/${categoryId}`);

}

}
