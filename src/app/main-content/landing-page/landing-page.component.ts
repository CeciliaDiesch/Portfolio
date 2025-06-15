import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für ngIf/ngFor
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {
  isGitHover = false;
  @ViewChild('tickerBar', { static: false }) tickerBar!: ElementRef<HTMLDivElement>;

  
  ngAfterViewInit() {
    this.startSmoothTicker();
  }
  private startSmoothTicker() {
    const bar = this.tickerBar.nativeElement;
    // scrollWidth enthält die Breite beider Gruppen zusammen
    const resetPoint = bar.scrollWidth / 2;
    let pos = 0;
    const speed = 0.5; // Pixel pro Frame (je nach gewünschter Geschwindigkeit)

    const step = () => {
      pos += speed;
      if (pos >= resetPoint) {
        // sofort zurück auf 0, ohne sichtbaren Sprung
        pos = 0;
      }
      bar.scrollLeft = pos;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
