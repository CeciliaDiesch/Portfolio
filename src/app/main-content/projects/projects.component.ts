import { CommonModule, NgIf } from '@angular/common';
import { Component,ViewChild,
  ElementRef,
  AfterViewInit } from '@angular/core';
  import { Project, TechItem } from './project.model';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';

const ANG: TechItem = { icon: 'assets/icons/frontend/angular.svg',  name: 'Angular' };
const TS:  TechItem = { icon: 'assets/icons/frontend/typeScript.svg',       name: 'TypeScript' };
const HTML:TechItem = { icon: 'assets/icons/frontend/HTML.svg',     name: 'HTML' };
const CSS: TechItem = { icon: 'assets/icons/frontend/CSS.svg',      name: 'CSS' };
const FB:  TechItem = { icon: 'assets/icons/frontend/firebase.svg', name: 'Firebase' };


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgIf, ProjectPreviewComponent],
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

  //für Preview-Large



  projects: Project[] = [
    { index: 1, name: 'Join', description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ', tech: [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (4).png'},
    { index: 2, name: 'El Pollo Loco', description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.', tech:  [ANG, TS, HTML, CSS, FB], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (3).png' },
    { index: 3, name: 'Bestell App', description: 'This App is a Lieferando-style food ordering platform. It lets you browse menus from multiple local restaurants, customize your dishes, place orders in just a few clicks, track your delivery in real time, and checkout—all through a clean, intuitive interface.', tech:  [TS, HTML, CSS,], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (1).png'}
    // { index: 4, name: 'DaBubble', description: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.', tech:  [TS, HTML, CSS,], github: 'www.det.de', live: 'www.elpolloloce.da', image: 'assets/img/projects (2).png'}

  ];

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
