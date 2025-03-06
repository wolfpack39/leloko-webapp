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
            import('./pages/shipment/shipment.component').then(
                (c) => c.ShipmentComponent
            ),
        title: 'Home',
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
