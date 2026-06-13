import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../shared/services/seo.services';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, MatIconModule, FadeInDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private seo = inject(SeoService);

  readonly services = [
    {
      id: 1, icon: 'analytics', title: 'Tax Advisory',
      desc: 'Konsultasi strategi perpajakan yang efektif untuk meminimalkan beban pajak secara legal dan berkelanjutan.',
      features: ['Tax Planning & Optimization', 'Restrukturisasi Bisnis', 'Transfer Pricing', 'Konsultasi Regulasi Pajak', 'Due Diligence Pajak'],
    },
    {
      id: 2, icon: 'assignment_turned_in', title: 'Tax Compliance',
      desc: 'Layanan kepatuhan pajak bulanan dan tahunan yang akurat, tepat waktu, dan sesuai regulasi terbaru.',
      features: ['Pelaporan SPT Tahunan & Bulanan', 'Perhitungan PPh 21, 22, 23, 26', 'Pelaporan PPN & Faktur Pajak', 'Rekonsiliasi Pajak', 'e-Filing & e-Billing'],
    },
    {
      id: 3, icon: 'pie_chart', title: 'Accounting & Bookkeeping',
      desc: 'Pembukuan akurat dan laporan keuangan tepat waktu sesuai standar akuntansi yang berlaku di Indonesia.',
      features: ['Pembukuan Harian & Bulanan', 'Laporan Keuangan (L/R, Neraca, Arus Kas)', 'Rekonsiliasi Bank & Akun', 'Laporan Manajemen', 'Sistem Akuntansi Digital'],
    },
    {
      id: 4, icon: 'verified_user', title: 'Tax Audit & Assistance',
      desc: 'Pendampingan profesional menghadapi pemeriksaan pajak, keberatan, hingga banding di pengadilan pajak.',
      features: ['Pendampingan Pemeriksaan Pajak', 'Penyusunan Tanggapan SP2', 'Pengajuan Keberatan & Banding', 'Sengketa Pajak', 'Permohonan Restitusi'],
    },
    {
      id: 5, icon: 'people', title: 'Payroll Service',
      desc: 'Pengelolaan penggajian karyawan yang akurat, tepat waktu, dan sesuai regulasi perpajakan terkini.',
      features: ['Perhitungan Gaji & Tunjangan', 'Perhitungan PPh 21 Karyawan', 'Slip Gaji & Laporan Payroll', 'Penghitungan BPJS TK & Kesehatan', 'THR & Pesangon'],
    },
    {
      id: 6, icon: 'trending_up', title: 'CFO Advisory',
      desc: 'Layanan advisory keuangan strategis untuk mendukung pertumbuhan bisnis dan profitabilitas yang berkelanjutan.',
      features: ['Analisis Keuangan & Profitabilitas', 'Perencanaan Anggaran (Budgeting)', 'Proyeksi Arus Kas', 'Strategi Ekspansi Bisnis', 'Laporan Keuangan Manajemen'],
    },
  ];

  readonly process = [
    { step: '01', icon: 'forum', title: 'Konsultasi Awal', desc: 'Sesi konsultasi gratis untuk memahami kebutuhan bisnis dan tantangan perpajakan Anda secara menyeluruh.' },
    { step: '02', icon: 'manage_search', title: 'Analisis & Diagnosis', desc: 'Tim kami melakukan analisis mendalam terhadap kondisi keuangan dan kepatuhan pajak bisnis Anda saat ini.' },
    { step: '03', icon: 'build_circle', title: 'Implementasi Solusi', desc: 'Eksekusi solusi yang telah disetujui dengan standar profesional tertinggi dan koordinasi aktif bersama klien.' },
    { step: '04', icon: 'loop', title: 'Monitoring & Laporan', desc: 'Pemantauan berkelanjutan, pelaporan berkala, dan penyesuaian strategi sesuai perubahan regulasi.' },
  ];

  readonly industries = [
    { icon: 'factory', name: 'Manufaktur' },
    { icon: 'storefront', name: 'Perdagangan & Ritel' },
    { icon: 'devices', name: 'Teknologi & Startup' },
    { icon: 'domain', name: 'Properti & Konstruksi' },
    { icon: 'account_balance', name: 'Jasa Keuangan' },
    { icon: 'restaurant', name: 'F&B & Hospitality' },
    { icon: 'local_hospital', name: 'Kesehatan & Farmasi' },
    { icon: 'school', name: 'Pendidikan & Sosial' },
  ];

  readonly faqs = [
    { q: 'Berapa lama proses konsultasi awal berlangsung?', a: 'Sesi konsultasi awal kami berlangsung sekitar 60–90 menit dan sepenuhnya gratis. Dalam sesi ini kami akan memahami kebutuhan bisnis, mengidentifikasi masalah, dan memberikan gambaran solusi yang tepat.' },
    { q: 'Apakah layanan konsultasi tersedia secara online?', a: 'Ya, kami menyediakan layanan konsultasi online melalui video call maupun email. Kami memahami kebutuhan fleksibilitas klien, terutama di era digital saat ini.' },
    { q: 'Bagaimana sistem pembayaran fee layanan?', a: 'Fee layanan kami transparan dan disepakati di awal kontrak. Tersedia sistem pembayaran bulanan, per proyek, atau retainer tahunan tergantung jenis layanan yang dipilih.' },
    { q: 'Apakah data keuangan saya terjaga kerahasiaannya?', a: 'Mutlak. Kami terikat oleh kode etik profesi dan perjanjian kerahasiaan (NDA) yang ketat. Semua data klien disimpan secara aman dan tidak pernah dibagikan kepada pihak ketiga tanpa izin.' },
    { q: 'Industri apa saja yang sudah pernah dilayani?', a: 'Kami berpengalaman melayani berbagai industri termasuk manufaktur, perdagangan, teknologi, properti, jasa keuangan, F&B, kesehatan, dan UMKM dari berbagai skala usaha.' },
    { q: 'Berapa lama waktu yang dibutuhkan untuk penyelesaian laporan keuangan?', a: 'Untuk laporan keuangan bulanan, kami umumnya menyelesaikan dalam 7–10 hari kerja setelah dokumen lengkap diterima. Laporan tahunan membutuhkan 2–4 minggu tergantung kompleksitas data.' },
  ];

  openFaqIndex = signal<number | null>(null);

  toggleFaq(i: number) {
    this.openFaqIndex.update(v => (v === i ? null : i));
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Layanan Kami',
      description: 'Solusi lengkap perpajakan dan akuntansi: Tax Advisory, Tax Compliance, Accounting, Payroll, hingga CFO Advisory oleh tim profesional bersertifikasi.',
      keywords: 'layanan konsultan pajak, tax advisory, tax compliance, accounting bookkeeping, payroll service, CFO advisory jakarta',
      slug: 'services',
    });
  }
}
