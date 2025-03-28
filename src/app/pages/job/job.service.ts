import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';
import { Job } from '../../model/job';
import { ErrorComponent } from '../../components/error/error.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080/jobs';
  private jobPostUrl = 'http://localhost:8080/job';

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
  
  getJobs(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postJob(job: Job) {
    console.log(job);
    this.http.post<Job>(this.jobPostUrl, job, this.httpOptions).subscribe({
      next: (response) => {
        this.openSuccessDialog('1500', '1000');
        this._router.navigate(['/home']);
        console.log('Post created successfully:', response);
      },
      error: (error) => {
        this.openErrorDialog('1500', '1000');
        console.error('Error creating post:', error);
      }
    }); 
    
  }

}
