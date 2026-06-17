import { Directive, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.timeoutId = setTimeout(() => {
      this.observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('fade-in-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.observer.observe(this.el.nativeElement);
    }, 100);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
    this.observer?.disconnect();
  }
}
