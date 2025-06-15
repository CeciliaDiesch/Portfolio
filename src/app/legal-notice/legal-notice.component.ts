import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Wenn du CommonModule für ngIf/ngFor etc. brauchst
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [    CommonModule, TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
