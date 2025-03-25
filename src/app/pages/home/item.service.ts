import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../model/item';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:3000/items';

  dialog = inject(MatDialog);

  constructor(private http: HttpClient) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
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
        this.openDialog('1500', '1000');
        console.error('Error creating post:', error);
      }
    }); 
    
    
  }

}
