import { Component} from '@angular/core';
import { CommonModule } from '@angular/common'; 


interface Reference {
  id: number;
  text: string;
  author: string;
  role: string;
}


@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent{
  references: Reference[] = [
    { id: 1, text: 'Cecilia demonstrated team and problem-solving skills with a self-motivated attitude to learn new programs. She was able to carry forth the project.', author: 'Uni. Prof. Dr. Thoralf Niendorf', role: 'Professor' },
    { id: 2, text: 'Frau Diesch zeigte eine hohe Einsatzbereitschaft in jeglichem Aufgabenbereich und eine sehr schnelle Auffassungsgabe.', author: 'A. Martin', role: 'Einrichtungsleitung' },
    { id: 3, text: 'She has been an indispensable part of our team. Her loyalty and highly motivating kind helped through many processes as well as her courage of trying ot the unknown.', author: 'M. Lederer', role: 'Team Leader' },
    { id: 4, text: 'Frau Diesch arbeitete sehr gewissenhaft und teamorientiert. Wir haben sie als freundliche Mitarbeiterin kennengelernt und würden sie jederzeit erneut einstellen.', author: 'Prof. Dr. med. Pirus Ghadjar', role: 'Team Leader' },
    { id: 5, text: 'Ich schätze besonders Cecilias’ Belastbarkeit und ihre Fähigkeit, auch unter Druck den Überblick zu behalten.', author: 'P. Wagner', role: 'Frontend Developer' },
  ];


  /** Zentrale State: welches Reference ist in der Mitte */
  activeIndex = 0;
  /** Die fünf Slots um -2..+2 */
  offsets: number[] = [-2, -1, 0, 1, 2];

  /** Helfer: berechnet aus activeIndex+offset den echten Index im Array */
  getIndex(off: number): number {
    const len = this.references.length;
    return ((this.activeIndex + off) % len + len) % len;
  }

  /** Klick „Nächste“: Mitte wandert um +1, Slots rotieren um –1 */
  showNext() {
    this.activeIndex = this.getIndex(1);
    this.rotateOffsets(-1);
  }

  /** Klick „Vorherige“: Mitte –1, Slots +1 */
  showPrev() {
    this.activeIndex = this.getIndex(-1);
    this.rotateOffsets(+1);
  }

  /** zyklisches Rotieren des offsets-Arrays */
  private rotateOffsets(delta: number) {
    this.offsets = this.offsets.map(off => {
      let n = off + delta;
      if (n > 2) n = -2;
      if (n < -2) n = 2;
      return n;
    });
  }

  /**
   * Spring direkt zur Reference `targetIndex`.
   * Berechnet, wie viele Schritte (next/prev) nötig sind,
   * um die neue Mitte ins Zentrum zu holen, und rotiert offsets entsprechend.
   */
  rotateOffsetsForDirectSelect(targetIndex: number) {
    const oldIndex = this.activeIndex;
    // 1) neue Mitte setzen
    this.activeIndex = targetIndex;
    // 2) Abstand im Array
    let diff = (targetIndex - oldIndex + this.references.length) % this.references.length;
    // 3) kürzeren Rotations-Weg wählen
    let direction = -1; // next
    if (diff > this.references.length / 2) {
      diff = this.references.length - diff;
      direction = 1;   // prev
    }
    // 4) offsets in diff-Schritten rotieren
    for (let i = 0; i < diff; i++) {
      this.rotateOffsets(direction);
    }
  }

  trackByIndex(i: number, _off: number) { return i; }
}


