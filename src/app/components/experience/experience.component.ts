import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE } from '../../core/data/resume.data';

@Component({
  selector: 'kk-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly entries = EXPERIENCE;
  readonly expandedId = signal<string>(EXPERIENCE[0].id);

  toggle(id: string): void {
    this.expandedId.update((current) => (current === id ? '' : id));
  }
}
