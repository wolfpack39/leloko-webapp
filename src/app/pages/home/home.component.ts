import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../job/job.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { Job } from '../../model/job';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatProgressSpinner, 
    MatInputModule,
    MatIconModule, 
    MatButton, 
    ReactiveFormsModule, MatFormFieldModule, RouterModule, MatTableModule, MatPaginatorModule],
  template: `
    @if(loading) {
      <mat-spinner style="margin-left: 40%; margin-top: 20%;" [diameter]="50"></mat-spinner>
    } @else {
      <div class="main-container">
        <h2>Jobs Status Report</h2>
        <div class="spacer">
            <mat-form-field>
                <mat-label>Filter</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Eg. #9384939" #input>
            </mat-form-field>
            <button mat-flat-button color="primary" [routerLink]="['/shipping']">Create Job</button>
        </div>
        
        <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" matSort>
          
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Job ID </th>
                <td mat-cell *matCellDef="let row"> {{ row.id }} </td>
              </ng-container>
          
              <!-- Progress Column -->
              <ng-container matColumnDef="submitDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Date Submitted </th>
                <td mat-cell *matCellDef="let row"> {{ row.submitDate }} </td>
              </ng-container>

              <ng-container matColumnDef="communicationChannel">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Communication Channel </th>
                <td mat-cell *matCellDef="let row"> {{ row.communicationChannel }} </td>
              </ng-container>

              <ng-container matColumnDef="stillages">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Stillages </th>
                <td mat-cell *matCellDef="let row"> {{row.stillages }} </td>
              </ng-container>

              <ng-container matColumnDef="pickupAddress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Collection Address </th>
                <td mat-cell *matCellDef="let row"> {{row.pickupAddress }} </td>
              </ng-container>
          
              <!-- Name Column -->
              <ng-container matColumnDef="destinationAddress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Destination Address</th>
                <td mat-cell *matCellDef="let row"> {{ row.destinationAddress }} </td>
              </ng-container>
  
              <ng-container matColumnDef="plannedStartDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Proposed Delivery Date </th>
                <td mat-cell *matCellDef="let row"> {{ row.plannedStartDate }} </td>
              </ng-container>

              <ng-container matColumnDef="actualStartDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Actual Start Date </th>
                <td mat-cell *matCellDef="let row"> {{ row.actualStartDate }} </td>
              </ng-container>

              <ng-container matColumnDef="actualEndDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Actual Delivery Date </th>
                <td mat-cell *matCellDef="let row"> {{ row.actualEndDate }} </td>
              </ng-container>

              <ng-container matColumnDef="user_id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Assigned Driver </th>
                <td mat-cell *matCellDef="let row"> {{ row.user_id }} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let row"> {{ row.status }} </td>
              </ng-container>

              <ng-container  matColumnDef="details">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Manage Details</th>
                <td mat-cell *matCellDef="let row"> <button  mat-button  color="primary" (click)="getJobById(row.id)"> <mat-icon>more_horiz</mat-icon></button></td>
              </ng-container>
          
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          
              <!-- Row shown when there is no matching data. -->
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
              </tr>
            </table>
          
            <mat-paginator 
              #paginator
              (page)="handlePageEvent($event)"
              [length]="length"
              [pageSize]="pageSize"
              [disabled]="disabled"
              [showFirstLastButtons]="showFirstLastButtons"
              [pageSizeOptions]="showPageSizeOptions ? pageSizeOptions : []"
              [hidePageSize]="hidePageSize"
              [pageIndex]="pageIndex"
            > 
            </mat-paginator>
          </div>
          
      </div>
    }
    
  `,
  styles: `
    .main-container {
        padding: 20px;
    }
    .spacer {
        display: flex;
        justify-content: space-between;
    }
    .mat-elevation-z8 {
        margin-top: 20px;
    }

    button {
      font-size: 14px;
      font-weight: 500;
        margin-left: 10px;
    }

    th {
      font-size: 14px;
      font-weight: 500; 
      color: rgba(0, 0, 0, 0.9);
    }
  `
})
export class HomeComponent {
  items = [];
  dataSource: MatTableDataSource<Job> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  displayedColumns: string[] = ['id', 'submitDate', 'communicationChannel', 'stillages', 'pickupAddress', 'destinationAddress', 'plannedStartDate', 
    'actualStartDate', 'actualEndDate', 'user_id', 'status', 'details' ];
  
  loading = true;

  totalItems = 0;
  length = 10000;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getJobs();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private jobService: JobService, private _router: Router, private cdr: ChangeDetectorRef) {  
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getJobs();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
    this.cdr.detectChanges();
  }

  getJobs(): void {
    this.jobService.getJobs(this.pageIndex + 1, this.pageSize)
      .subscribe((response) => {
        this.items = response;
        this.totalItems = response.total;
        console.log(this.items);
        this.dataSource = new MatTableDataSource(response);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getJobById(id: number) {
    this.jobService.getJobById(id);
    this._router.navigate(['/shipping/detail', id]);
  } 

} 
