import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from '../main-content/nav-bar/nav-bar.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [    CommonModule, TranslateModule, NavBarComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
