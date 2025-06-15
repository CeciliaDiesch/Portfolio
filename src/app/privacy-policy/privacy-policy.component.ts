import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Wenn du CommonModule für ngIf/ngFor etc. brauchst
import { TranslateModule } from '@ngx-translate/core'; // <--- HINZUFÜGEN

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [    CommonModule, TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() { } // constructor(private router: Router) { } if needed

  ngOnInit(): void {
    // Falls hier Logik zum Initialisieren nötig ist
  }
}
