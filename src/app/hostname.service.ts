import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@angular/core';
import { Request } from 'express';

@Injectable({
  providedIn: 'root',
})
export class HostnameService {
  private request: Request | null;

  constructor(@Inject(PLATFORM_ID) private platformId: object, @Inject(REQUEST) private req?: Request) {
    this.request = this.req || null;
  }

  /** Retorna um hostname compatível com SSR + CSR */
  getHostname(): string {
    if (isPlatformBrowser(this.platformId)) {
        console.log('TRUUUUUE')
      return 'TESTE';//window.location.hostname;
    } else {
      return this.request?.headers.host?.split(':')[0] || 'localhost';
    }
  }
}
