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

  /**
   * Checks if the current route is a static page (e.g. the legal notice).
   * @returns {boolean} True if the current route is '/legal-notice'.
   */
  isStaticPage(): boolean {
    return this.router.url === '/legal-notice' ;
  }

  /**
   * Initializes the application language settings.
   * Sets a default language and uses a stored or browser-preferred language if available.
   */
  ngOnInit(): void {
    this.translate.setDefaultLang('de');
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang && browserLang.match(/en|de/) ? browserLang : 'de');
    }
  }
}
