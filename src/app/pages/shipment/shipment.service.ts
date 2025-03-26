import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Shipment } from '../../model/item';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private apiUrl = 'http://localhost:3000/shipments';

  dialog = inject(MatDialog);

  constructor(private http: HttpClient) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  getShipments(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postShipment(shipment: Shipment) {
    console.log(shipment);
    this.http.post<Shipment>(this.apiUrl, shipment, this.httpOptions).subscribe({
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
