// src/app/main-content/skills/skills.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Falls benötigt
import { RouterModule } from '@angular/router'; // Für <a> mit routerLink

import { TranslateModule } from '@ngx-translate/core'; // <--- HINZUFÜGEN

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule, RouterModule, TranslateModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
}
