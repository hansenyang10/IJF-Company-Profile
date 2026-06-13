import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { SeoService } from '../../shared/services/seo.services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, MatIconModule, FadeInDirective, CountUpDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);

  readonly values = [
    { icon: 'verified_user', title: 'Integritas', desc: 'Kami bekerja dengan standar etika tertinggi, menjaga kepercayaan klien sebagai prioritas utama dalam setiap penugasan.' },
    { icon: 'psychology', title: 'Profesionalisme', desc: 'Tim kami terdiri dari profesional bersertifikasi dengan keahlian mendalam di bidang perpajakan dan akuntansi.' },
    { icon: 'visibility', title: 'Transparansi', desc: 'Setiap proses dikomunikasikan secara terbuka kepada klien, tanpa biaya atau agenda tersembunyi.' },
    { icon: 'lock', title: 'Kerahasiaan', desc: 'Data dan informasi klien dijaga dengan ketat sesuai standar keamanan dan kode etik profesi.' },
    { icon: 'handshake', title: 'Klien-Sentris', desc: 'Setiap solusi disesuaikan dengan kebutuhan spesifik klien — bukan pendekatan generik satu ukuran untuk semua.' },
    { icon: 'trending_up', title: 'Berorientasi Hasil', desc: 'Kami mengukur keberhasilan dari dampak nyata yang dirasakan klien, bukan sekadar penyelesaian tugas.' },
  ];

  readonly milestones = [
    { year: '2016', title: 'Pendirian IJF Fintax', desc: 'Ignatius Julyani Fintax resmi didirikan di Jakarta sebagai firma konsultan pajak independen.' },
    { year: '2018', title: '100+ Klien Aktif', desc: 'Dalam dua tahun pertama, IJF Fintax berhasil melayani lebih dari 100 klien aktif dari berbagai sektor industri.' },
    { year: '2020', title: 'Ekspansi Layanan', desc: 'Meluncurkan layanan CFO Advisory dan Payroll Service untuk melengkapi portofolio solusi keuangan.' },
    { year: '2022', title: 'Sertifikasi & Pertumbuhan', desc: 'Seluruh konsultan senior mendapatkan sertifikasi Brevet A & B dan terdaftar aktif di IKPI dan IAI.' },
    { year: '2024', title: '300+ Klien Terlayani', desc: 'Melampaui 300 klien aktif dengan tingkat retensi 98%, menjadi firma terpercaya pilihan di Jakarta.' },
    { year: '2026', title: 'Transformasi Digital', desc: 'Mengintegrasikan teknologi digital untuk meningkatkan kecepatan, akurasi, dan aksesibilitas layanan.' },
  ];

  readonly team = [
    { name: 'Ignatius Julyani', role: 'Founder & Tax Consultant', tags: ['Brevet A & B', 'Tax Professional', 'IKPI & IAI Member'], img: 'assets/team/user.png' },
    { name: 'Jessica Noviani', role: 'Tax Manager', tags: ['Brevet A & B', 'Tax Compliance', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Robby Kurniawan', role: 'Accounting Manager', tags: ['Akuntan Profesional', 'S1 Akuntansi', 'IAI Member'], img: 'assets/team/user.png' },
    { name: 'Michelle Wijaya', role: 'Audit & Tax Senior', tags: ['Brevet A & B', 'Tax Audit', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Andreas Halim', role: 'Payroll Supervisor', tags: ['Payroll Specialist', 'PPh 21 Expert', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Stefani Claudia', role: 'CFO Advisory Senior', tags: ['Financial Analyst', 'CFO Advisory', 'S1 Akuntansi'], img: 'assets/team/user.png' },
  ];

  ngOnInit() {
    this.seo.generateTags({
      title: 'Tentang Kami',
      description: 'Mengenal Ignatius Julyani Fintax — firma konsultan pajak dan akuntansi terpercaya yang berdiri sejak 2016 di Jakarta.',
      keywords: 'tentang IJF fintax, konsultan pajak jakarta, firma akuntansi indonesia, ignatius julyani',
      slug: 'about',
    });
  }
}
