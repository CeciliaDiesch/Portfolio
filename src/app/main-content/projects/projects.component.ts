// src/app/main-content/projects/projects.component.ts
import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core'; // inject hinzugefügt
import { Project, TechItem } from './project.model';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core'; // <--- HINZUFÜGEN

// Tech-Items bleiben unverändert, da die Namen hier als englische Konstanten definiert sind.
// Wenn die Tech-Namen selbst übersetzt werden müssten (z.B. "Angular" in "Angular"), müsste
// das TechItem-Interface angepasst werden und diese Konstanten würden die Translate-Pipe nutzen.
// Für den Moment gehen wir davon aus, dass Tech-Namen international gleich sind.
const ANG: TechItem = { icon: 'assets/icons/frontend/angular.svg', name: 'Angular' };
const TS: TechItem = { icon: 'assets/icons/frontend/typeScript.svg', name: 'TypeScript' };
const HTML: TechItem = { icon: 'assets/icons/frontend/HTML.svg', name: 'HTML' };
const CSS: TechItem = { icon: 'assets/icons/frontend/CSS.svg', name: 'CSS' };
const FB: TechItem = { icon: 'assets/icons/frontend/firebase.svg', name: 'Firebase' };


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgIf, ProjectPreviewComponent, TranslateModule], // <--- TranslateModule hier importieren
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsContainer', { static: true })
  projectsContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('projectPreview', { static: true })
  projectPreview!: ElementRef<HTMLDivElement>;

  previewSrc: string | null = null;
  previewTop = 0;

  private translate = inject(TranslateService); // <--- Inject TranslateService

  // WICHTIG: Die Projekte-Daten MÜSSEN mehrsprachig werden, da die Beschreibung übersetzt werden soll
  // Die "description" Eigenschaft wird jetzt ein Objekt mit Sprachen
  projects: Project[] = []; // Initialisiere es leer

  constructor() {
    // Rufe die Methode zum Laden/Aktualisieren der Projekte auf
    this.updateProjectsDescriptions();

    // Reagiere auf Sprachwechsel, um die Projektbeschreibungen zu aktualisieren
    this.translate.onLangChange.subscribe(() => {
      this.updateProjectsDescriptions();
    });
  }

  ngAfterViewInit() {
    // initial keine Vorschau, Position egal
  }

  // Neue Methode, um die Projektbeschreibungen basierend auf der aktuellen Sprache zu setzen
  private updateProjectsDescriptions() {
    const currentLang = this.translate.currentLang;

    // Erstelle ein "Base"-Array der Projekte ohne Beschreibungen
    const baseProjects = [
      { index: 1, name: 'Join', tech: [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (4).png' },
      { index: 2, name: 'El Pollo Loco', tech: [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (3).png' },
      { index: 3, name: 'Bestell App', tech: [TS, HTML, CSS], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (1).png' }
      // { index: 4, name: 'DaBubble', tech: [TS, HTML, CSS], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (2).png' }
    ];

    // Mappe die Basisprojekte und füge die übersetzten Beschreibungen hinzu
    this.projects = baseProjects.map(p => ({
      ...p,
      description: this.translate.instant(`PROJECTS.PROJECT_${p.index}.DESCRIPTION`)
    }));
    // WICHTIG: .instant() verwenden, da wir hier nicht auf Observable warten können
    // Alternativ: Wenn die Beschreibungen sehr lang sind, könnten Sie TranslateService.get() verwenden
    // und dieses Array von Projekten in einem Observable speichern, aber .instant() ist hier meist OK.
  }

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

  onLeavePreview() {
    this.previewSrc = null;
  }

  activeIndex: number | null = null;

  openPreview(idx: number) {
    this.activeIndex = idx;
    document.body.classList.add('modal-open');
  }

  closePreview() {
    this.activeIndex = null;
    document.body.classList.remove('modal-open');
  }

  nextPreview() {
    if (this.activeIndex === null) return;
    this.activeIndex = (this.activeIndex + 1) % this.projects.length;
  }

  get activeProject(): Project | undefined {
    return this.activeIndex !== null
      ? this.projects[this.activeIndex]
      : undefined;
  }
}