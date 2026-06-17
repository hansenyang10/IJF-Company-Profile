import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title?: string;
  description: string;
  keywords?: string;
  image?: string;
  slug?: string;
}

const SITE_NAME = 'Ignatius Julyani Fintax';
const BASE_URL = 'https://namaperusahaan.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-default.jpg`;

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  generateTags(config: SeoConfig) {
    const pageTitle = config.title
      ? `${config.title} | ${SITE_NAME}`
      : SITE_NAME;

    this.titleService.setTitle(pageTitle);

    const canonicalUrl = `${BASE_URL}/${config.slug ?? ''}`;
    const image = config.image ?? DEFAULT_IMAGE;

    // Standard meta
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:locale', content: 'id_ID' });
    this.metaService.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:image', content: image });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });

    // Canonical link
    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
