import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCard, MatButton, MatInputModule],
  template: `
    <mat-card>
    <mat-form-field>
    <mat-label>Username</mat-label>
      <input matInput placeholder="username" formControlName="pickupAddress">
    </mat-form-field>
    <mat-form-field>
    <mat-label>Password</mat-label>
      <input matInput placeholder="password" type="password" formControlName="pickupAddress">
    </mat-form-field>
      <button mat-flat-button (click)="login()">
        Login
      </button>
    </mat-card>
  `,
  styles: `

    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    mat-card {
      display: flex;
      width: 30%;
      padding: 2em;
    }

    button {
      position: relative;
      width: 240px;
      left: 6em;
    }
  `
})
export class LoginComponent {
  
  @Input() loginStatus = false;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  login() {
    this.changed.emit(this.loginStatus = true);
  }
}
