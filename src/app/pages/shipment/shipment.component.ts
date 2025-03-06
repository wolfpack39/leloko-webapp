import { Component } from '@angular/core';
import { ShipmentCardComponent } from "../../components/shipment-card/shipment-card.component";

@Component({
  selector: 'app-shipment',
  imports: [ShipmentCardComponent],
  template: `
    <app-shipment-card></app-shipment-card>
  `,
  styles: ``
})
export class ShipmentComponent {

}
