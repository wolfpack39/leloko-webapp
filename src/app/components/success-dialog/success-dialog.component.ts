import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content id="content">
      Form submitted Successfully!
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `,
  styles: `
    #content {
      font-size: 1em;
      font-weight: 500;
    }
  `
})
export class SuccessDialogComponent {

}
