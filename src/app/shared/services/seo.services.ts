import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description: string;
  keywords?: string;
  image?: string;
  slug?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  generateTags(config: SeoConfig) {
    // Jika ingin override title secara dinamis (misal untuk detail artikel di halaman insights)
    if (config.title) {
      this.titleService.setTitle(`${config.title} | NamaPerusahaan`);
    }

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph / Facebook (Penting untuk visual share)
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: config.title || this.titleService.getTitle() });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: `https://namaperusahaan.com/${config.slug || ''}` });
    this.metaService.updateTag({ property: 'og:image', content: config.image || 'https://namaperusahaan.com/assets/og-default.jpg' });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title || this.titleService.getTitle() });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
  }
}