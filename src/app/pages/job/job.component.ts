import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { JobService } from './job.service';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job',
  imports: [
    ReactiveFormsModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinner
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {
  title = signal('Job Request');
  shipmentForm: FormGroup

  loading = true;

  communicationChannel = ['WhatsApp', 'Email', 'Call', 'Other'];

  users = ['Michael Moloto', 'Kabelo Lehobye', 'Mpho Molete', 'Other'];
  vehicles = ['1.3 Ton Bakkie', '4 Ton Half Truck', '8 Ton Truck', 'Other'];

  formObject = {
    submitDate: new FormControl({
      value: '',
      disabled: false
    }),
    communicationChannel: new FormControl({
      value: '',
      disabled: false
    }),
    comments: new FormControl({
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
    user: new FormControl({
      value: '',
      disabled: false
    }),
    vehicle: new FormControl({
      value: '',
      disabled: false
    }),
    plannedStartDate: new FormControl({
      value: '',
      disabled: false
    }),
    actualStartDate: new FormControl({
      value: '',
      disabled: false
    }),
    actualEndDate: new FormControl({
      value: '',
      disabled: false
    }),
    status: new FormControl({
      value: 'Pending',
      disabled: false
    }),
    dateSubmitted: [new Date().toISOString().slice(0, 10), Validators.required]
  }

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private jobService: JobService) { 
    this.shipmentForm = this.fb.group(this.formObject as any);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.jobService.getJobs
  }

  onSubmit() {
    setTimeout(() => {
      this.loading = true;
      
    }, 500)
    
    setTimeout(() => {
      this.jobService.postJob(this.shipmentForm.value);
      this.loading = false;
    }, 3000)
  }
}
