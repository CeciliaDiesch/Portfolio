import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {Project} from '../project.model'

@Component({
  selector: 'app-project-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss'
})
export class ProjectPreviewComponent {
  @Input() project!: Project;          // Die Daten für genau dieses Projekt
  @Input() isOpen = false;             // Steuerung, ob Modal sichtbar ist

    /** Events werden per Output() oder Callback-Funktionen an den Parent zurückgemeldet */
    @Input() close!: () => void;
    @Input() next!: () => void;

}
