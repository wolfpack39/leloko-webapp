import { Component, inject } from '@angular/core';
import { MatCardModule }  from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../model/item';
import { ItemService } from '../../pages/home/item.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  standalone: true,
  selector: 'app-shipment-card',
  imports: [MatCardModule, MatInputModule, MatButton, MatTabsModule, ReactiveFormsModule],
  template: `

    <form [formGroup]="shipmentForm">
      <div class="summary-section">
        <h1>I am shipping as a...</h1>
        <mat-tab-group>
          <mat-tab label="Business">

          <mat-card>
          <span id="from-header">From</span>
            <mat-form-field>
            <mat-label>Pick up address</mat-label>
              <input matInput placeholder="From" formControlName="pickupAddress">
            </mat-form-field>
            
          </mat-card>

          <mat-card>
              <span id="to-header">To</span>
              <mat-form-field>
              <mat-label>Destination address...</mat-label>
                <input matInput placeholder="To" formControlName="destinationAddress">
              </mat-form-field>
            </mat-card>

          </mat-tab>
          <mat-tab label="Private Individual">
            <p>Content 2</p>
          </mat-tab>
        </mat-tab-group>
      </div>

      <div class="shipping-section">
        <h1>Shipment Details</h1>
        <mat-card>
          
          <mat-card-content>

            <span id="weight-header">Weight</span>
            <mat-form-field>
            <mat-label>Weight (kg)</mat-label>
              <input matInput placeholder="Shipment Weight" formControlName="weight">
            </mat-form-field>

            <span id="dimensions-header">Dimensions</span>
            <mat-form-field>
            <mat-label>Length (cm) </mat-label>
              <input matInput placeholder="Shipment Length" formControlName="length">
            </mat-form-field>

            <mat-form-field>
            <mat-label>Width (cm) </mat-label>
              <input matInput placeholder="Shipment Width" formControlName="width">
            </mat-form-field>

            <mat-form-field>
            <mat-label>Height (cm) </mat-label>
              <input matInput placeholder="Shipment Height" formControlName="height">
            </mat-form-field>

          </mat-card-content>
        </mat-card>
      </div>

      <button mat-flat-button color="primary" [disabled]="!shipmentForm.valid" (click)="onSubmit()">Submit</button>
    </form>
    
    
  `,
  styles: `

    .summary-section {
      width: 100%;
      padding: 1em;

      mat-tab-group {
        padding: 1em;
      }

      mat-card {
        width: 40%;
        padding: 2em;
        margin: 1em;
      }

      mat-form-field {
        margin-top: 2em;
      }
    }

    h1 {
      font-size: 1.5em;
      font-weight: 700;
      margin-left: 2em;
    }

    span {
      font-weight: 600;
    }

    #weight-header {
      position: absolute;
      top: 0.5em;
      left: 1.2em;
      font-size: 1.4em;
      font-weight: 600;
    }

    #dimensions-header {
      position: absolute;
      top: 0.5em;
      left: 13.2em;
      font-size: 1.4em;
      font-weight: 600;
    }

    mat-form-field {
      position: relative;
      margin-top: 2em;
      margin-right: 2em;
    }

    .shipping-section {
      position: sticky;
      top: 0;
      overflow: hidden;
      border-box: box-sizing;
      height: 100%;
      padding: 2em 3em;
      background-color: #f5f5f5;
      overflow-y : hidden;
      padding-bottom: 2em;
    }

    form {
      display: flex;
      flex-direction: column;
      button {
        position: relative;
        right: -60em;
        margin: 1em 1em;
        width: 10%;
        font-size: 1.2em;
      }
    }

  `
})
export class ShipmentCardComponent {
  shipmentForm: FormGroup;

  items: Item[] = []; 

  public formObject = {
    pickupAddress: ['', Validators.required],
    destinationAddress: ['', Validators.required],
    weight: ['', Validators.required],
    length: ['', Validators.required],
    width: ['', Validators.required],
    height: ['', Validators.required],
  };

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.shipmentForm = this.fb.group(this.formObject);
  }

  onSubmit() {
    this.itemService.postItem(this.shipmentForm.value);
  }

  readonly dialog = inject(MatDialog);

  

}

