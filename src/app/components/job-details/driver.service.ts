import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from '../../model/job';
import { ErrorComponent } from '../error/error.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'http://localhost:8080/';
  dialog = inject(MatDialog);
  
  constructor(private http: HttpClient, private _router: Router) {}
  
  ngInit(): void {

  }

  openErrorDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ErrorComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSuccessDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  getDriversByPage(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl + "driver"}?page=${page}&limit=${limit}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDrivers() {
    return this.http.get<any>(this.apiUrl + 'drivers', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
  }

  getDriverById(id: number) {
    return this.http.get<any>(this.apiUrl + 'driver/' + id, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  postDriver(driver: User) {
    console.log(driver);
    this.http.post<Job>(this.apiUrl + '/user', driver, this.httpOptions).subscribe({
      next: (response) => {
        this.openSuccessDialog('1500', '1000');
        this._router.navigate(['/home']);
        console.log('Created successfully:', response);
      },
      error: (error) => {
        this.openErrorDialog('1500', '1000');
        console.error('Error creating post:', error);
      }
    }); 
    
  }
}
