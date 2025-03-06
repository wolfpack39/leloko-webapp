import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButton],
  template: `
    <p>Welcome to the Home Page</p>
  `,
  styles: `
    
  `
})
export class HomeComponent {

}
