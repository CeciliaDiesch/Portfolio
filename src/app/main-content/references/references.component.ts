import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';  
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselControlComponent
} from '@coreui/angular';

interface Reference {
  text:   string;
  author: string;
  role:   string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    CommonModule, 
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink
  ],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
  slides: Reference[] = new Array(3).fill({ text: '', author: '', role: '' });

  ngOnInit(): void {
    this.slides[0] = {
      text: '„Die Zusammenarbeit war erstklassig – ich habe unglaublich viel gelernt.“',
      author: 'Marina Müller',
      role: 'Frontend-Entwicklerin'
    };
    this.slides[1] = {
      text: '„Top Performance und super Support: Kann ich nur empfehlen!“',
      author: 'Jonas Schmidt',
      role: 'Full-Stack-Engineer'
    };
    this.slides[2] = {
      text: '„Sehr professioneller Workflow und schnelle Umsetzung unserer Wünsche.“',
      author: 'Sabine Bauer',
      role: 'Projektmanagerin'
    };
  }

  trackByText(_: number, item: Reference): string {
    return item.text;
  }
}
