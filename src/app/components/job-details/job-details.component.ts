import { AfterViewInit, Component, inject } from '@angular/core';
import { JobService } from '../../pages/job/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../model/job';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DriverService } from './driver.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-job-details',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatProgressSpinner,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements AfterViewInit {

  loading = true;
  job = signal<Job | null>(null);
   dialog = inject(MatDialog);

  drivers  = signal<any | null>(null);
  assignDriverForm: Form | undefined;
  driverForm: FormGroup;

  formObject = {
    driver: new FormControl({
      value: {},
      disabled: false
    })
  }
  
  driver = new FormControl<User | null>(null, Validators.required);

  constructor(private jobService: JobService, 
    private driverService: DriverService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _router: Router
  ) { 
    this.driverForm = fb.group(this.formObject);
  }
  ngAfterViewInit(): void {
    this.getJobById()
  }

  ngOnInit() {
    this.getJobById();
    this.driverService.getDrivers().subscribe(
      (resp: any) => {
        this.drivers.set(resp);
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getJobById() {
    const jobId = this.activatedRoute.snapshot.paramMap.get('id');
    this.jobService.getJobById(Number(jobId)).subscribe({
      next: (resp: any) => {
        this.job.set(resp);
      }
    })
  }

  back(): void {
    this.router.navigate([".."])
  }

  assignDriver(userId: number) {
    const jobId = this.activatedRoute.snapshot.paramMap.get('id');
  
    setTimeout(() => {
      this.loading = true;
      
    }, 500)
    
    setTimeout(() => {
      this.jobService.patchDriver(Number(jobId), userId).subscribe({
        next: (resp: any) => {
          this.openSuccessDialog('1500', '1000');
          this.job.set(resp)
          this.getJobById()
          this._router.navigate(['/home/detail/' + jobId])
        }
      })
      this.loading = false;
    }, 3000)
    
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

}
