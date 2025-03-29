import { Component } from '@angular/core';
import { JobService } from '../../pages/job/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../model/job';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DriverService } from './driver.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {

  loading = true;
  job: Job | undefined;

  constructor(private jobService: JobService, 
    private driverService: DriverService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const jobId = this.activatedRoute.snapshot.paramMap.get('id');
    this.jobService.getJobById(Number(jobId)).subscribe(
      (resp: any) => {
        this.job = resp;
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  back(): void {
    this.router.navigate([".."])
  }

  assignDriver(driverId: number) {

  }

}
