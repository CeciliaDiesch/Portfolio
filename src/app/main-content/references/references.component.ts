import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

interface BaseReference {
  id: number;
  textKey: string;
  authorKey: string;
  roleKey: string;
}

interface TranslatedReference {
  id: number;
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})

export class ReferencesComponent implements OnInit {
  private translate = inject(TranslateService);

  baseReferences: BaseReference[] = [
    { id: 1, textKey: 'REFERENCES.REFERENCE_1.TEXT', authorKey: 'REFERENCES.REFERENCE_1.AUTHOR', roleKey: 'REFERENCES.REFERENCE_1.ROLE' },
    { id: 2, textKey: 'REFERENCES.REFERENCE_2.TEXT', authorKey: 'REFERENCES.REFERENCE_2.AUTHOR', roleKey: 'REFERENCES.REFERENCE_2.ROLE' },
    { id: 3, textKey: 'REFERENCES.REFERENCE_3.TEXT', authorKey: 'REFERENCES.REFERENCE_3.AUTHOR', roleKey: 'REFERENCES.REFERENCE_3.ROLE' },
    { id: 4, textKey: 'REFERENCES.REFERENCE_4.TEXT', authorKey: 'REFERENCES.REFERENCE_4.AUTHOR', roleKey: 'REFERENCES.REFERENCE_4.ROLE' },
    { id: 5, textKey: 'REFERENCES.REFERENCE_5.TEXT', authorKey: 'REFERENCES.REFERENCE_5.AUTHOR', roleKey: 'REFERENCES.REFERENCE_5.ROLE' },
  ];

  references: TranslatedReference[] = [];
  activeIndex = 0;
  offsets: number[] = [-2, -1, 0, 1, 2];

  constructor() {
    this.updateReferences();
    this.translate.onLangChange.subscribe(() => {
      this.updateReferences();
    });
  }

  ngOnInit(): void {
  }
  
  /**
   * Maps the base reference entries to their translated versions 
   * by resolving translation keys using the current language.
   */
  private updateReferences() {
    this.references = this.baseReferences.map(ref => ({
      id: ref.id,
      text: this.translate.instant(ref.textKey),
      author: this.translate.instant(ref.authorKey),
      role: this.translate.instant(ref.roleKey),
    }));
  }

  /**
   * Calculates the correct index based on an offset, wrapping around the array if necessary.
   * @param {number} off - The offset to apply to the active index.
   * @returns {number} - The resulting valid index within the references array.
   */
  getIndex(off: number): number {
    const len = this.references.length;
    return ((this.activeIndex + off) % len + len) % len;
  }

  /**
   * Advances to the next reference and rotates the offset array to reflect the visual shift.
   */
  showNext() {
    this.activeIndex = this.getIndex(1);
    this.rotateOffsets(-1);
  }

  /**
   * Moves to the previous reference and rotates the offset array to reflect the visual shift.
   */
  showPrev() {
    this.activeIndex = this.getIndex(-1);
    this.rotateOffsets(+1);
  }

  /**
   * Rotates the offset array by the given delta, keeping all values within the range [-2, 2].
   * Used to update the visual position of references in a cyclic layout.
   * @param {number} delta - The direction and amount of rotation.
   */
  private rotateOffsets(delta: number) {
    this.offsets = this.offsets.map(off => {
      let n = off + delta;
      if (n > 2) n = -2;
      if (n < -2) n = 2;
      return n;
    });
  }

  /**
   * Rotates the offsets to directly jump to a specific reference index,
   * determining the shortest rotation direction.
   * @param {number} targetIndex - The index to jump to.
   */
  rotateOffsetsForDirectSelect(targetIndex: number) {
    const oldIndex = this.activeIndex;
    this.activeIndex = targetIndex;
    let diff = (targetIndex - oldIndex + this.references.length) % this.references.length;
    let direction = -1;
    if (diff > this.references.length / 2) {
      diff = this.references.length - diff;
      direction = 1;
    }
    for (let i = 0; i < diff; i++) {
      this.rotateOffsets(direction);
    }
  }

  /**
   * Tracking function for ngFor to improve performance by tracking items by index.
   * @param {number} i - The index of the current item.
   * @param {number} _off - The offset value (unused).
   * @returns The index as the unique identifier.
   */
  trackByIndex(i: number, _off: number) { return i; }
}