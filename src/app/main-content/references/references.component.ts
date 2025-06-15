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

  private updateReferences() {
    this.references = this.baseReferences.map(ref => ({
      id: ref.id,
      text: this.translate.instant(ref.textKey),
      author: this.translate.instant(ref.authorKey),
      role: this.translate.instant(ref.roleKey),
    }));
  }

  getIndex(off: number): number {
    const len = this.references.length;
    return ((this.activeIndex + off) % len + len) % len;
  }

  showNext() {
    this.activeIndex = this.getIndex(1);
    this.rotateOffsets(-1);
  }

  showPrev() {
    this.activeIndex = this.getIndex(-1);
    this.rotateOffsets(+1);
  }

  private rotateOffsets(delta: number) {
    this.offsets = this.offsets.map(off => {
      let n = off + delta;
      if (n > 2) n = -2;
      if (n < -2) n = 2;
      return n;
    });
  }

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

  trackByIndex(i: number, _off: number) { return i; }
}