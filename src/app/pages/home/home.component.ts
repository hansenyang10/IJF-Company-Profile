import { Component, inject, OnInit, signal } from '@angular/core';
import { SeoService } from '../../shared/services/seo.services';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountUpDirective, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);

  // Data Statis untuk Ribbon Penilaian/Pencapaian
  readonly stats = signal([
    { value: '10+', label: 'Tahun Pengalaman', sub: 'Sejak 2016', icon: 'history' },
    { value: '300+', label: 'Perusahaan Klien', sub: 'Dari berbagai industri', icon: 'business' },
    { value: '98%', label: 'Client Retention', sub: 'Komitmen & kepercayaan klien', icon: 'trending_up' },
    { value: '100%', label: 'Transparan & Akuntabel', sub: 'Dalam setiap proses kerja', icon: 'verified_user' }
  ]);

  // Data Layanan Utama (Grid 6 Kolom)
  readonly services = signal([
    { id: 1, icon: 'analytics', title: 'Tax Advisory', desc: 'Konsultasi strategi perpajakan yang efektif, perencanaan tax planning, dan optimalisasi beban pajak.' },
    { id: 2, icon: 'assignment_turned_in', title: 'Tax Compliance', desc: 'Layanan kepatuhan pajak bulanan, PPh, PPN, PPh 21, PPh 23/26, dan pelaporan SPT.' },
    { id: 3, icon: 'pie_chart', title: 'Accounting & Bookkeeping', desc: 'Pembukuan akurat, laporan keuangan tepat waktu, dan analisis keuangan untuk pengambilan keputusan.' },
    { id: 4, icon: 'verified_user', title: 'Tax Audit & Assistance', desc: 'Pendampingan pemeriksaan pajak, keberatan, banding, dan penyelesaian sengketa pajak.' },
    { id: 5, icon: 'people', title: 'Payroll Service', desc: 'Pengelolaan payroll dan perhitungan PPh 21 yang akurat dan sesuai regulasi terbaru.' },
    { id: 6, icon: 'trending_up', title: 'CFO Advisory', desc: 'Layanan advisory keuangan untuk pertumbuhan bisnis dan profitabilitas yang berkelanjutan.' }
  ]);

  // Data Tim Profesional
  readonly team = signal([
    { name: 'Ignatius Julyani', role: 'Founder & Tax Consultant', tags: ['Brevet A & B', 'Tax Professional'], img: 'assets/team/ignatius.jpg' },
    { name: 'Jessica Noviani', role: 'Tax Manager', tags: ['Brevet A & B', 'Tax Compliance'], img: 'assets/team/jessica.jpg' },
    { name: 'Robby Kurniawan', role: 'Accounting Manager', tags: ['Akuntan Profesional', 'S1 Akuntansi'], img: 'assets/team/robby.jpg' },
    { name: 'Michelle Wijaya', role: 'Audit & Tax Senior', tags: ['Brevet A & B', 'Tax Audit'], img: 'assets/team/michelle.jpg' }
  ]);

  // Data Insight / Artikel Terbaru
  readonly insights = signal([
    { title: 'Perubahan Tarif Pajak 2026, Apa yang Perlu Anda Ketahui?', tag: 'Perpajakan', date: '20 Mei 2026', img: 'assets/insights/news1.jpg' },
    { title: '5 Kesalahan SPT yang Sering Dilakukan Wajib Pajak', tag: 'Tax Tips', date: '15 Mei 2026', img: 'assets/insights/news2.jpg' },
    { title: 'Update PMK Terbaru Terkait PPh dan Faktur Pajak', tag: 'Regulasi', date: '10 Mei 2026', img: 'assets/insights/news3.jpg' }
  ]);

  ngOnInit(): void {
    this.seo.generateTags({
      description: 'Firma konsultan pajak dan akuntansi tepercaya untuk pertumbuhan bisnis Anda. Menyediakan layanan Tax Advisory, Compliance, hingga CFO Advisory.',
      keywords: 'konsultan pajak, accounting jkt, tax compliance, laporan keuangan',
      slug: ''
    });
  }
}