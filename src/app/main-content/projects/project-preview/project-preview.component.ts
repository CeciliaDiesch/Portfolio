import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import {Project} from '../project.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-preview',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss'
})
export class ProjectPreviewComponent {
  @Input() project!: Project;
  @Input() isOpen = false;
  @Input() close!: () => void;
  @Input() next!: () => void;

  /**
   * Detects changes to the isOpen input and toggles page scroll accordingly.
   * Disables body scrolling when the project preview is open.
   * @param {SimpleChanges} changes - Object containing the changed input properties.
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }
}
