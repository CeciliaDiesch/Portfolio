import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { Project, TechItem } from './project.model';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

const ANG: TechItem = { icon: 'assets/icons/frontend/angular.svg', name: 'Angular' };
const TS: TechItem = { icon: 'assets/icons/frontend/typeScript.svg', name: 'TypeScript' };
const HTML: TechItem = { icon: 'assets/icons/frontend/HTML.svg', name: 'HTML' };
const CSS: TechItem = { icon: 'assets/icons/frontend/CSS.svg', name: 'CSS' };
const FB: TechItem = { icon: 'assets/icons/frontend/firebase.svg', name: 'Firebase' };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgIf, ProjectPreviewComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [];
  activeIndex: number | null = null;
  /**
   * Reference to the projects container and project preview element used for DOM access or interaction.
   */
  @ViewChild('projectsContainer', { static: true })
  projectsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('projectPreview', { static: true })
  projectPreview!: ElementRef<HTMLDivElement>;

  /**
   * Holds the image source path for the project preview, or null if none is selected and defines the vertical position.
   */
  previewSrc: string | null = null;
  previewTop = 0;

  /**
   * Injects the translation service for handling dynamic language switching and translations.
   */
  private translate = inject(TranslateService);

  constructor() {
    this.updateProjectsDescriptions();
    this.translate.onLangChange.subscribe(() => {
      this.updateProjectsDescriptions();
    });
  }

  /**
   * Lifecycle hook after the view has been fully initialized.
   * Currently unused, but reserved for future logic (e.g. preview positioning).
   */
  ngAfterViewInit() {
  }

  /**
   * Updates the project list by adding language-specific descriptions 
   * based on the current active language.
   */
  private updateProjectsDescriptions() {
    const currentLang = this.translate.currentLang;
    const baseProjects = [
      { index: 1, name: 'Join', tech: [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'https://join.diesch-dev.com/', image: 'assets/img/projects (4).png' },
      { index: 2, name: 'El Pollo Loco', tech: [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'https://el-pollo-loco.diesch-dev.com/', image: 'assets/img/projects (3).png' },
      { index: 3, name: 'Bestell App', tech: [TS, HTML, CSS], github: 'www.det.de', live: 'https://bestellapp.diesch-dev.com/', image: 'assets/img/projects (1).png' }
    ];
    this.projects = baseProjects.map(p => ({
      ...p,
      description: this.translate.instant(`PROJECTS.PROJECT_${p.index}.DESCRIPTION`)
    }));
  }

  /**
   * Sets the preview image source and calculates its vertical position relative to the hovered project row.
   * @param {HTMLElement} rowEl - The hovered project row element.
   * @param {string} src - The image source to display in the preview.
   */
  onHoverPreview(rowEl: ElementRef<HTMLDivElement>['nativeElement'], src: string) {
    this.previewSrc = src;
    setTimeout(() => {
      const containerRect = this.projectsContainer.nativeElement.getBoundingClientRect();
      const rowRect = (rowEl as HTMLElement).getBoundingClientRect();
      const previewEl = this.projectPreview.nativeElement;
      const previewH = previewEl.offsetHeight;
      let top = (rowRect.top - containerRect.top) + rowRect.height / 2 - previewH / 2;
      const min = -10;
      const max = containerRect.height - previewH + 10;
      top = Math.max(min, Math.min(max, top));
      this.previewTop = top;
    });
  }

  /**
   * Clears the preview image when the mouse leaves the project row.
   */
  onLeavePreview() {
    this.previewSrc = null;
  }

  /**
   * Opens the project preview modal for the given index and disables body scroll.
   * @param {number} idx - The index of the selected project to preview.
   */
  openPreview(idx: number) {
    this.activeIndex = idx;
    document.body.classList.add('modal-open');
  }

  /**
   * Closes the project preview modal and re-enables body scroll.
   */
  closePreview() {
    this.activeIndex = null;
    document.body.classList.remove('modal-open');
  }

  /**
   * Advances to the next project in the preview carousel, wrapping around if at the end.
   */
  nextPreview() {
    if (this.activeIndex === null) return;
    this.activeIndex = (this.activeIndex + 1) % this.projects.length;
  }

  /**
   * Returns the currently active project based on the active index, or undefined if none is selected.
   */
  get activeProject(): Project | undefined {
    return this.activeIndex !== null
      ? this.projects[this.activeIndex]
      : undefined;
  }
}