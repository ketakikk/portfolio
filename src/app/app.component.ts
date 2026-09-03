import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSceneComponent } from './components/hero-scene/hero-scene.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ContactComponent } from './components/contact/contact.component';
import { ScrollSpyService } from './services/scroll-spy.service';

@Component({
  selector: 'kk-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSceneComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    AchievementsComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly sectionIds = ['hero', 'about', 'skills', 'experience', 'achievements', 'contact'];

  constructor(private scrollSpy: ScrollSpyService) {}

  ngAfterViewInit(): void {
    this.scrollSpy.observe(this.sectionIds);
  }

  ngOnDestroy(): void {
    this.scrollSpy.destroy();
  }
}
