import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasoPoc } from '../../model/caso';

@Component({
  selector: 'app-principal',
  imports: [RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  casos: CasoPoc[];

  constructor() {
    this.casos = [
    { url: '/objwin', texto: 'Objeto Window no Angular SSR' },
    { url: '/popover', texto: 'Popover' },
    ];
  }
}
