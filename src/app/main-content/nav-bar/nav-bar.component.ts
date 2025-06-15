import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für ngIf/ngClass
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

  ngOnInit(): void {
    // Die aktuelle Sprache beim Start setzen
    this.currentLanguage = this.translate.currentLang || localStorage.getItem('currentLang') || 'de';

    // Auf Sprachwechsel reagieren, um die Anzeige im Button zu aktualisieren
    this.translate.onLangChange.subscribe(() => {
      this.currentLanguage = this.translate.currentLang;
    });
  }

  switchLanguage(lang: string) {
    if (this.currentLanguage !== lang) { // Nur wechseln, wenn sich die Sprache ändert
      this.translate.use(lang);
      localStorage.setItem('currentLang', lang); // Sprache im localStorage speichern
      // currentLanguage wird durch onLangChange.subscribe aktualisiert
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEnter() {
    if (this.canHover) this.isHoverLang = true;
  }
  onLeave() {
    if (this.canHover) this.isHoverLang = false;
  }

  getLanguageImageSrc(): string {
    const base = this.currentLanguage === 'en' ? 'eng' : 'ger';
    const suffix = this.isHoverLang ? 'Hover' : '';
    return `assets/img/${base}${suffix}.svg`;
  }
}
