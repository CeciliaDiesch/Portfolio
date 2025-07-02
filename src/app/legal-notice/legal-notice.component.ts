import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from '../main-content/nav-bar/nav-bar.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [    CommonModule, TranslateModule,NavBarComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
}
