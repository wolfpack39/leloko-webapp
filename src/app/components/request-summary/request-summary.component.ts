import { Component } from '@angular/core';
import { RequestSummaryCardComponent } from "../request-summary-card/request-summary-card.component";

@Component({
  selector: 'app-request-summary',
  imports: [RequestSummaryCardComponent],
  template: `
    <app-request-summary-card></app-request-summary-card>
  `,
  styles: ``
})
export class RequestSummaryComponent {

}
