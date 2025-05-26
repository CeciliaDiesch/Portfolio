import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule} from '@angular/common';


interface Review {
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  reviews: Review[] = [
    {
      text: 'Lukas has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.',
      author: 'H. Janisch',
      role: 'Team Partner'
    },
    {
      text: 'I had the good fortune of working with Lukas on a complex UX redesign project at the Developer Akademie. He always stayed calm, coordinated effort, and made sure our team was set up for success.',
      author: 'T. Schulz',
      role: 'Frontend Developer'
    },
    {
      text: 'Working alongside Lukas was a pleasure—he is knowledgeable, easy to work with, and I would happily collaborate with him again given the chance.',
      author: 'M. Becker',
      role: 'UX Designer'
    }
  ];

   // Aktuell im Fokus
   currentIndex = 0;

   // Berechnet die drei anzuzeigenden Reviews: [vorheriges, aktuelles, nächstes]
   get window(): Review[] {
     const n = this.reviews.length;
     const prev = (this.currentIndex + n - 1) % n;
     const next = (this.currentIndex + 1) % n;
     return [
       this.reviews[prev],
       this.reviews[this.currentIndex],
       this.reviews[next],
     ];
   }
 
   // Pfeil links
   prev() {
     this.currentIndex = (this.currentIndex + this.reviews.length - 1) % this.reviews.length;
   }
 
   // Pfeil rechts
   next() {
     this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
   }
}
