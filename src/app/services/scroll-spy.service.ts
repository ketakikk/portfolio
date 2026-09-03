import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  /** id of the section currently in view */
  readonly activeSection = signal<string>('hero');

  /** normalised 0..1 scroll progress through the whole page, used for hero parallax */
  readonly scrollProgress = signal<number>(0);

  private observer?: IntersectionObserver;

  observe(sectionIds: string[]): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          this.activeSection.set(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    }

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  private onScroll = (): void => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(max > 0 ? window.scrollY / max : 0);
  };

  destroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
  }
}
