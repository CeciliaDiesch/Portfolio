import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  
  /**
   * Lifecycle hook that runs after the view has been fully initialized.
   * Starts the smooth scrolling ticker animation.
   */
  ngAfterViewInit() {
    this.startSmoothTicker();
  }
  
  /**
   * Creates a continuously scrolling ticker effect by updating the scroll position of the ticker bar.
   * Resets the scroll position when half the content has been scrolled to create a seamless loop.
   */
  private startSmoothTicker() {
    const bar = this.tickerBar.nativeElement;
    const resetPoint = bar.scrollWidth / 2;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos += speed;
      if (pos >= resetPoint) {
        pos = 0;
      }
      bar.scrollLeft = pos;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
