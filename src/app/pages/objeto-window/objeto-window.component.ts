import { Component } from '@angular/core';
import { WindowService } from '../../window.service';

// Testes no uso do objeto window no angular 19 com ssr
@Component({
  selector: 'app-objeto-window',
  imports: [],
  template: '<h1>HOST: {{ hostname }}</h1>'
})
export class ObjetoWindowComponent {
  hostname: string | null = null;

  constructor(private wService: WindowService) {
    if (wService.nativeWindow) {
      this.hostname = wService.nativeWindow.location.hostname;
    } else {
      this.hostname = 'AGUARDE';
    }
  }
}