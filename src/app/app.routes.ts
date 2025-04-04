import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => 
            import('./pages/home/home.component').then(
                (c) => c.HomeComponent
            ),
        title: 'Home',
    },
    {
        path: 'driver-management',
        loadComponent: () => 
            import('./pages/driver-management/driver-management.component').then(
                (c) => c.DriverManagementComponent
            ),
        title: 'Driver Management',
    },
    {
        path: 'shipping',
        loadComponent: () => 
            import('./pages/job/job.component').then(
                (c) => c.JobComponent
            ),
        title: 'Home',
    },
    {
        path: 'home/detail/:id',
        loadComponent: () => 
            import('./components/job-details/job-details.component').then(
                (c) => c.JobDetailsComponent
            ),
        data: { title: 'Job Details', showInNavBar: false },
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
