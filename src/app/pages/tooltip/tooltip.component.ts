import { Component } from '@angular/core';
import { Arrow } from '@ngx-popovers/core';
import { PopoverComponent, PopoverTemplate  } from '@ngx-popovers/popover';


@Component({
  selector: 'app-popover',
  imports: [
    Arrow,
    PopoverComponent,
    PopoverTemplate],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {

}
