import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private objWindow: Window | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(platformId)) {
      this.objWindow = window;
    }
  }

  get nativeWindow(): Window | null {
    return this.objWindow;
  }
}
