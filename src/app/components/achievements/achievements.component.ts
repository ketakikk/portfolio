import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACHIEVEMENTS, EDUCATION } from '../../core/data/resume.data';

@Component({
  selector: 'kk-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent {
  readonly achievements = ACHIEVEMENTS;
  readonly education = EDUCATION;
}
