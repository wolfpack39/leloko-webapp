import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './item.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Item } from '../../model/item';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatInputModule ,MatButton, ReactiveFormsModule, MatFormFieldModule, RouterModule, MatTableModule, MatPaginatorModule],
  template: `
    
    <div class="main-container">
        <h2>Shipments</h2>
        <div class="spacer">
            <mat-form-field>
                <mat-label>Filter</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Eg. #9384939" #input>
            </mat-form-field>
            <button mat-flat-button color="primary" [routerLink]="['/shipping']">Create Shipment</button>
        </div>
        
        <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" matSort>
          
              <!-- ID Column -->
              <ng-container matColumnDef="shipmentId">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Shipment ID </th>
                <td mat-cell *matCellDef="let row"> {{ row.shipmentId }} </td>
              </ng-container>
          
              <!-- Progress Column -->
              <ng-container matColumnDef="weight">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Weight </th>
                <td mat-cell *matCellDef="let row"> {{ row.weight }} </td>
              </ng-container>

              <ng-container matColumnDef="length">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Length </th>
                <td mat-cell *matCellDef="let row"> {{row.length}} </td>
              </ng-container>
          
              <!-- Name Column -->
              <ng-container matColumnDef="width">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Width</th>
                <td mat-cell *matCellDef="let row"> {{ row.width }} </td>
              </ng-container>

              <ng-container matColumnDef="height">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Height </th>
                <td mat-cell *matCellDef="let row"> {{ row.height }} </td>
              </ng-container>

              <ng-container matColumnDef="pickupAddress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Pickup Address </th>
                <td mat-cell *matCellDef="let row"> {{ row.pickupAddress }} </td>
              </ng-container>

              <ng-container matColumnDef="destinationAddress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Destination Address </th>
                <td mat-cell *matCellDef="let row"> {{ row.destinationAddress }} </td>
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
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  displayedColumns: string[] = ['shipmentId', 'weight', 'length', 'width', 'height', 'pickupAddress', 'destinationAddress'];
  
  dataLoaded = false;

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
    this.getItems();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private itemService: ItemService, private _router: Router, private cdr: ChangeDetectorRef) {  
    
  }

  ngOnInit() {
    this.getItems();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.dataLoaded = true
    }, 1000)
    this.cdr.detectChanges();
  }

  getItems(): void {
    this.itemService.getItems(this.pageIndex + 1, this.pageSize)
      .subscribe((response) => {
        this.items = response.data;
        this.totalItems = response.total;
        console.log(this.items);
        this.dataSource = new MatTableDataSource(response.data);
      });
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

} 
