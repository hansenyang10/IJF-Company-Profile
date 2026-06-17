import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  @Input('appCountUp') targetValue!: string | number;
  @Input() duration = 1500;

  private observer?: IntersectionObserver;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.startCounting();
        this.observer?.disconnect();
      }
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);
  }

  private startCounting() {
    const stringValue = String(this.targetValue);
    const match = stringValue.match(/(\d+)/);

    if (!match) {
      this.el.nativeElement.innerText = stringValue;
      return;
    }

    const targetNumber = parseInt(match[0], 10);
    const suffix = stringValue.replace(match[0], '');
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetNumber);

      this.el.nativeElement.innerText = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.el.nativeElement.innerText = stringValue;
      }
    };

    requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
