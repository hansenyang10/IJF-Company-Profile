import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  
  @Input('appCountUp') targetValue!: string | number;
  @Input() duration = 1500; // Durasi animasi dalam milidetik (1.8 detik)

  private observer!: IntersectionObserver;

  ngOnInit() {
    // 1. Deteksi saat elemen masuk ke viewport
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.startCounting();
        this.observer.disconnect(); // Matikan observer agar animasi hanya jalan sekali saat di-scroll
      }
    }, { threshold: 0.1 }); // Trigger berjalan ketika 10% elemen sudah terlihat di layar

    this.observer.observe(this.el.nativeElement);
  }

  private startCounting() {
    const stringValue = String(this.targetValue);
    // Regex untuk memisahkan angka dengan simbol (misal: "10+" -> "10" dan "+", "98%" -> "98" dan "%")
    const match = stringValue.match(/(\d+)/);
    
    if (!match) {
      this.el.nativeElement.innerText = stringValue;
      return;
    }

    const targetNumber = parseInt(match[0], 10);
    const suffix = stringValue.replace(match[0], ''); // Mengambil sisa simbol (+ atau %)
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function (OutQuad): Animasi cepat di awal, lalu melambat halus di akhir
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetNumber);
      
      // Update teks langsung ke DOM untuk performa terbaik
      this.el.nativeElement.innerText = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.el.nativeElement.innerText = stringValue; // Memastikan hasil akhir presisi
      }
    };

    requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}