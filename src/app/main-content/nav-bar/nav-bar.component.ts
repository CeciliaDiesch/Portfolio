import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit  {
  isHover = false;
  isHoverLang =false;
  isMenuOpen = false;
  currentLanguage: string = 'de';
  canHover = window.matchMedia('(hover: hover)').matches;
  
  constructor(private translate: TranslateService) { }

  /**
   * Initializes the component by setting the current language and subscribing to language changes.
   * Updates the language state to reflect changes in the translation service.
   */
  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang || localStorage.getItem('currentLang') || 'de';
    this.translate.onLangChange.subscribe(() => {
      this.currentLanguage = this.translate.currentLang;
    });
  }

  /**
   * Switches the app language if it's different from the current one and saves it to localStorage.
   */
  switchLanguage(lang: string) {
    if (this.currentLanguage !== lang) {
      this.translate.use(lang);
      localStorage.setItem('currentLang', lang);
    }
  }

  /**
   * Toggles the visibility of the mobile menu.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Activates the language hover state if hovering is supported.
   */
  onEnter() {
    if (this.canHover) this.isHoverLang = true;
  }

  /**
   * Deactivates the language hover state if hovering is supported.
   */
  onLeave() {
    if (this.canHover) this.isHoverLang = false;
  }

  /**
   * Returns the image path for the current language button, using a hover variant if active.
   * @returns {string} The path to the appropriate language icon.
   */
  getLanguageImageSrc(): string {
    const base = this.currentLanguage === 'en' ? 'eng' : 'ger';
    const suffix = this.isHoverLang ? 'Hover' : '';
    return `assets/img/${base}${suffix}.svg`;
  }
}
