import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _http: HttpClient) { }

  addBook(data: any){
    return this._http.post('http://localhost:3000/books', data)
  }

  getBookList(): Observable<any> {
    return this._http.get('http://localhost:3000/books')
  }

  deleteBook(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/books/${id}`)
  }

  editBook(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/books/${id}`,data)
  }
}
