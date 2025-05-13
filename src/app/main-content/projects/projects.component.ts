import { CommonModule, NgIf } from '@angular/common';
import { Component,ViewChild,
  ElementRef,
  AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit{
  @ViewChild('projectsContainer', { static: true })
  projectsContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('projectPreview', { static: true })
  projectPreview!: ElementRef<HTMLDivElement>;

  previewSrc: string | null = null;
  previewTop = 0;

  ngAfterViewInit() {
    // initial keine Vorschau, Position egal
  }

  onHoverPreview(rowEl: ElementRef<HTMLDivElement>['nativeElement'], src: string) {
    this.previewSrc = src;

    // kleine Verzögerung, bis das Preview-Element im DOM sichtbar ist
    setTimeout(() => {
      const containerRect = this.projectsContainer.nativeElement.getBoundingClientRect();
      const rowRect = (rowEl as HTMLElement).getBoundingClientRect();
      const previewEl = this.projectPreview.nativeElement;
      const previewH = previewEl.offsetHeight;

      // Mitte der Zeile relativ zum Container
      let top = (rowRect.top - containerRect.top) + rowRect.height/2 - previewH/2;

      // Ober- und Untergrenze mit ±10px Puffer:
      const min = -10;
      const max = containerRect.height - previewH + 10;
      top = Math.max(min, Math.min(max, top));

      this.previewTop = top;
    });
  }

  onLeavePreview() {
    this.previewSrc = null;
  }
}
