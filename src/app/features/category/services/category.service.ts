import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-requets.model';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private cookieService:CookieService) { }
  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.url}/categories?addAuth=true`, model);
  }
  getAllCategories(): Observable<Category[]> {
    
    return this.http.get<Category[]>(`${environment.url}/categories`);
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.url}/categories/${id}`);
  }
  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : Observable<Category> {
    return this.http.put<Category>(`${environment.url}/categories/${id}?addAuth=true`, updateCategoryRequest,{
      headers:{
        'Authorization':this.cookieService.get('Authorization')
      }
    });
  }
  deleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.url}/categories/${id}?addAuth=true`)
  }
}
