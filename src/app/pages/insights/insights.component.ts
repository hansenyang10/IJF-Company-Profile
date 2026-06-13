import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../shared/services/seo.services';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [RouterLink, MatIconModule, FadeInDirective],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss',
})
export class InsightsComponent implements OnInit {
  private seo = inject(SeoService);

  readonly categories = ['Semua', 'Perpajakan', 'Tax Tips', 'Regulasi', 'Akuntansi'];
  activeCategory = signal<string>('Semua');

  readonly articles = signal([
    { title: 'Perubahan Tarif Pajak 2026: Apa yang Perlu Diketahui Wajib Pajak?', tag: 'Perpajakan', date: '20 Mei 2026', author: 'Ignatius Julyani', readTime: '5 menit', img: 'assets/insights/news1.jpg', featured: true, excerpt: 'Pemerintah kembali melakukan penyesuaian tarif pajak untuk tahun 2026. Simak ringkasan lengkap perubahan dan dampaknya bagi bisnis Anda.' },
    { title: '5 Kesalahan SPT yang Paling Sering Dilakukan Wajib Pajak', tag: 'Tax Tips', date: '15 Mei 2026', author: 'Jessica Noviani', readTime: '4 menit', img: 'assets/insights/news2.jpg', featured: false, excerpt: 'Kesalahan dalam pengisian SPT dapat berujung pada sanksi dan denda. Kenali 5 kesalahan paling umum dan cara menghindarinya.' },
    { title: 'Update PMK Terbaru: Aturan Baru PPh dan Faktur Pajak', tag: 'Regulasi', date: '10 Mei 2026', author: 'Michelle Wijaya', readTime: '6 menit', img: 'assets/insights/news3.jpg', featured: false, excerpt: 'Peraturan Menteri Keuangan terbaru membawa perubahan signifikan pada tata cara penghitungan PPh dan penerbitan faktur pajak.' },
    { title: 'Panduan Lengkap Pembukuan yang Benar untuk UMKM', tag: 'Akuntansi', date: '5 Mei 2026', author: 'Robby Kurniawan', readTime: '7 menit', img: 'assets/insights/news1.jpg', featured: false, excerpt: 'Pembukuan yang rapi adalah fondasi bisnis yang sehat. Pelajari cara mudah memulai sistem pembukuan untuk UMKM Anda.' },
    { title: 'Strategi Tax Planning Efektif untuk Perusahaan di 2026', tag: 'Tax Tips', date: '28 Apr 2026', author: 'Ignatius Julyani', readTime: '8 menit', img: 'assets/insights/news2.jpg', featured: false, excerpt: 'Tax planning yang baik bukan soal menghindari pajak, melainkan merencanakan kewajiban pajak secara legal dan efisien.' },
    { title: 'Memahami PPh Final: Kapan dan Siapa yang Wajib Membayar?', tag: 'Perpajakan', date: '22 Apr 2026', author: 'Jessica Noviani', readTime: '5 menit', img: 'assets/insights/news3.jpg', featured: false, excerpt: 'PPh Final memiliki aturan dan tarif yang berbeda dari PPh umum. Pahami kapan PPh Final berlaku untuk bisnis Anda.' },
    { title: 'Perubahan Iuran BPJS 2026 dan Dampaknya pada Payroll', tag: 'Regulasi', date: '15 Apr 2026', author: 'Andreas Halim', readTime: '4 menit', img: 'assets/insights/news1.jpg', featured: false, excerpt: 'Penyesuaian iuran BPJS Ketenagakerjaan dan Kesehatan berdampak langsung pada perhitungan penggajian karyawan Anda.' },
    { title: 'Laporan Keuangan Bulanan: Mengapa Ini Vital untuk Bisnis Anda', tag: 'Akuntansi', date: '8 Apr 2026', author: 'Stefani Claudia', readTime: '5 menit', img: 'assets/insights/news2.jpg', featured: false, excerpt: 'Laporan keuangan bulanan bukan sekadar formalitas — ini adalah kompas navigasi bisnis Anda setiap bulannya.' },
  ]);

  readonly filtered = computed(() => {
    const cat = this.activeCategory();
    const all = this.articles();
    return cat === 'Semua' ? all : all.filter(a => a.tag === cat);
  });

  readonly featured = computed(() => this.articles().find(a => a.featured) ?? this.articles()[0]);

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Insight & Artikel',
      description: 'Update terkini seputar regulasi pajak, tips perencanaan pajak, dan panduan akuntansi bisnis dari para ahli IJF Fintax.',
      keywords: 'insight pajak, artikel akuntansi, regulasi pajak 2026, tips spt, tax planning indonesia',
      slug: 'insights',
    });
  }
}
