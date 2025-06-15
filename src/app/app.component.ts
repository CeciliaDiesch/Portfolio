import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor(public router: Router, private translate: TranslateService) {}

  isStaticPage(): boolean {
    return this.router.url === '/legal-notice' ;
  }

  ngOnInit(): void {
    // 1. Standardsprache festlegen (z.B. Deutsch)
    this.translate.setDefaultLang('de');

    // 2. Sprache basierend auf Browser oder gespeichertem Wert setzen
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      // Erkennen der Browsersprache
      const browserLang = this.translate.getBrowserLang();
      // Sicherstellen, dass die Browsersprache eine unserer unterstützten Sprachen ist, sonst auf Standard zurückfallen
      this.translate.use(browserLang && browserLang.match(/en|de/) ? browserLang : 'de');
    }
  }
}
