import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}
  
  getItems(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postItem(item: Item) {
    console.log(item);
    this.http.post<Item>(this.apiUrl, item, this.httpOptions).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      }
    }); 
    
    
  }

}
