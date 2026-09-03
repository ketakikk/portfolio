import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT } from '../../core/data/resume.data';

interface StatItem {
  value: string;
  label: string;
}

@Component({
  selector: 'kk-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly contact = CONTACT;

  readonly stats: StatItem[] = [
    { value: '8+', label: 'Years in enterprise Angular' },
    { value: '5', label: 'Companies & client engagements' },
    { value: '3', label: 'Domains — banking, telecom, energy' },
    { value: '2 → 18', label: 'Angular versions shipped' },
  ];
}
