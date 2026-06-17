import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Konsultan Pajak & Akuntansi Terpercaya Jakarta | Ignatius Julyani Fintax'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Tentang Kami | Ignatius Julyani Fintax'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Layanan Pajak & Akuntansi | Ignatius Julyani Fintax'
  },
  {
    path: 'insights',
    loadComponent: () => import('./pages/insights/insights.component').then(m => m.InsightsComponent),
    title: 'Insight & Artikel Pajak Terbaru | Ignatius Julyani Fintax'
  },
  {
    path: 'career',
    loadComponent: () => import('./pages/career/career.component').then(m => m.CareerComponent),
    title: 'Karir Bersama Kami | Ignatius Julyani Fintax'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Hubungi Kami | Ignatius Julyani Fintax'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
