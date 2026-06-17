import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);

  ngOnInit() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Ignatius Julyani Fintax',
      alternateName: 'IJF Fintax',
      url: 'https://namaperusahaan.com',
      logo: 'https://namaperusahaan.com/assets/logos/ijf-logo.png',
      image: 'https://namaperusahaan.com/assets/og-default.jpg',
      description: 'Firma konsultan pajak dan akuntansi terpercaya di Jakarta sejak 2016. Melayani Tax Advisory, Tax Compliance, Accounting, Payroll, dan CFO Advisory.',
      foundingDate: '2016',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressCountry: 'ID'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'customer service',
        availableLanguage: 'Indonesian',
        hoursAvailable: 'Mo-Fr 09:00-17:00'
      },
      sameAs: [
        'https://linkedin.com',
        'https://instagram.com'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Layanan Konsultan Pajak & Akuntansi',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Advisory' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Compliance' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accounting & Bookkeeping' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Audit & Assistance' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Payroll Service' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CFO Advisory' } },
        ]
      }
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
