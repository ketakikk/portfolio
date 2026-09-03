import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../../core/data/resume.data';

@Component({
  selector: 'kk-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly categories = SKILLS;
  readonly activeCategory = signal<string>(SKILLS[0].id);

  select(id: string): void {
    this.activeCategory.set(id);
  }
}
