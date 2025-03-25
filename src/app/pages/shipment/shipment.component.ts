import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ItemService } from '../home/item.service';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shipment',
  imports: [
    ReactiveFormsModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinner
  ],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  title = signal('Create Shipment Request');
  shipmentForm: FormGroup

  loading = true;

  communicationChannel = ['WhatsApp', 'Email', 'Call', 'Other'];

  drivers = ['Michael Moloto', 'Kabelo Lehobye', 'Mpho Molete', 'Other'];

  formObject = {
    clientName: new FormControl({
      value: '',
      disabled: false
    }),
    communicationChannel: new FormControl({
      value: '',
      disabled: false
    }),
    stillages: new FormControl({
      value: '',
      disabled: false
    }),
    pickupAddress: new FormControl({
      value: '',
      disabled: false
    }),
    destinationAddress: new FormControl({
      value: '',
      disabled: false
    }),
    driver: new FormControl({
      value: '',
      disabled: false
    }),
    plannedDate: new FormControl({
      value: '',
      disabled: false
    }),
    dateSubmitted: [new Date().toISOString().slice(0, 10), Validators.required]
  }

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private itemService: ItemService) { 
    this.shipmentForm = this.fb.group(this.formObject as any);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    
  }

  onSubmit() {
    setTimeout(() => {
      this.loading = true;
      
    }, 500)
    
    setTimeout(() => {
      this.itemService.postItem(this.shipmentForm.value);
      this.loading = false;
    }, 3000)
  }
}
