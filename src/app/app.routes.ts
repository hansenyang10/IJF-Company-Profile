import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Solusi Teknologi Terbaik untuk Bisnis Anda | NamaPerusahaan'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Tentang Kami - Mengenal Visi & Misi Kami | NamaPerusahaan'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Layanan & Solusi Digital Profesional | NamaPerusahaan'
  },
  {
    path: 'insights',
    loadComponent: () => import('./pages/insights/insights.component').then(m => m.InsightsComponent),
    title: 'Wawasan, Tren Teknologi & Berita Terbaru | NamaPerusahaan'
  },
  {
    path: 'career',
    loadComponent: () => import('./pages/career/career.component').then(m => m.CareerComponent),
    title: 'Karir - Bergabunglah dengan Tim Inovatif Kami | NamaPerusahaan'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Hubungi Kami - Konsultasikan Kebutuhan Anda | NamaPerusahaan'
  },
  {
    path: '**',
    redirectTo: ''
  }
];