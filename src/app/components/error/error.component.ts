import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  imports: [MatDialogModule, MatButtonModule],
    template: `
      <h2 mat-dialog-title>Error!!</h2>
      <mat-dialog-content id="content">
        Failed to create request. Please contact your administrator
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
      </mat-dialog-actions>
    `,
    styles: `
      h2 {
        color: red;
      }
      #content {
        font-size: 1em;
        font-weight: 500;
      }
    `
})
export class ErrorComponent {

}
