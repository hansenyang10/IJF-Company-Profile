import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../shared/services/seo.services';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [RouterLink, MatIconModule, FadeInDirective],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
})
export class CareerComponent implements OnInit {
  private seo = inject(SeoService);

  readonly benefits = [
    { icon: 'payments', title: 'Kompensasi Kompetitif', desc: 'Gaji dan tunjangan di atas rata-rata industri, disesuaikan dengan kompetensi dan pengalaman Anda.' },
    { icon: 'health_and_safety', title: 'BPJS & Asuransi', desc: 'Jaminan BPJS Kesehatan & Ketenagakerjaan penuh, ditambah asuransi jiwa dan kesehatan tambahan.' },
    { icon: 'school', title: 'Pelatihan & Sertifikasi', desc: 'Program pelatihan intensif, akses kursus online, dan dukungan biaya sertifikasi Brevet A & B.' },
    { icon: 'schedule', title: 'Work-Life Balance', desc: 'Jam kerja fleksibel, cuti tahunan penuh, dan opsi kerja remote untuk posisi tertentu.' },
    { icon: 'groups', title: 'Tim yang Solid', desc: 'Lingkungan kerja kolaboratif, suportif, dan menyenangkan bersama tim profesional yang berpengalaman.' },
    { icon: 'rocket_launch', title: 'Jalur Karir Jelas', desc: 'Program pengembangan karir terstruktur dengan review kinerja berkala dan jalur promosi yang transparan.' },
  ];

  readonly jobs = [
    {
      title: 'Tax Consultant (Senior)',
      dept: 'Tax Advisory & Compliance',
      type: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: '3–5 tahun di bidang perpajakan',
      responsibilities: [
        'Memberikan konsultasi strategi perpajakan kepada klien korporasi',
        'Menyusun dan mereview laporan SPT Tahunan & Bulanan (PPh, PPN)',
        'Mendampingi klien dalam proses pemeriksaan pajak',
        'Menganalisis dampak regulasi pajak terbaru terhadap bisnis klien',
        'Membangun dan mempertahankan hubungan klien jangka panjang',
      ],
      requirements: [
        'S1 Akuntansi / Perpajakan dari universitas terkemuka',
        'Memiliki sertifikasi Brevet A & B (wajib)',
        'Pengalaman min. 3 tahun di KAP atau firma konsultan pajak',
        'Menguasai perpajakan Indonesia (PPh, PPN, Pajak Daerah)',
        'Anggota aktif IKPI atau IAI (lebih diutamakan)',
      ],
    },
    {
      title: 'Junior Accountant',
      dept: 'Accounting & Bookkeeping',
      type: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: '0–2 tahun (fresh graduate welcome)',
      responsibilities: [
        'Melakukan input dan pencatatan transaksi keuangan harian',
        'Menyusun rekonsiliasi bank dan akun setiap bulan',
        'Membantu penyusunan laporan keuangan bulanan dan tahunan',
        'Mengelola dokumen akuntansi dan administrasi klien',
        'Berkoordinasi dengan tim tax untuk keperluan pelaporan',
      ],
      requirements: [
        'S1 Akuntansi, IPK minimal 3.00',
        'Memahami standar akuntansi PSAK',
        'Mahir menggunakan Microsoft Excel dan software akuntansi',
        'Teliti, terorganisir, dan berorientasi pada detail',
        'Fresh graduate dipersilakan melamar',
      ],
    },
    {
      title: 'Payroll Specialist',
      dept: 'Payroll Service',
      type: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: '2–3 tahun di bidang payroll / HR',
      responsibilities: [
        'Mengelola perhitungan gaji, lembur, dan tunjangan karyawan klien',
        'Menghitung PPh 21 karyawan dengan akurat sesuai regulasi',
        'Memproses pembayaran iuran BPJS Kesehatan & Ketenagakerjaan',
        'Menyusun slip gaji dan laporan payroll bulanan',
        'Memastikan kepatuhan payroll terhadap UU Ketenagakerjaan',
      ],
      requirements: [
        'S1 Akuntansi, Manajemen, atau bidang terkait',
        'Pengalaman min. 2 tahun mengelola payroll perusahaan',
        'Menguasai perhitungan PPh 21 dan BPJS',
        'Familiar dengan software payroll (HRIS)',
        'Teliti, menjaga kerahasiaan data karyawan',
      ],
    },
    {
      title: 'Business Development Executive',
      dept: 'Management & Business',
      type: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: '2–4 tahun di bidang sales / BD',
      responsibilities: [
        'Mengidentifikasi dan mengembangkan peluang bisnis baru',
        'Melakukan presentasi dan pitching layanan kepada calon klien',
        'Membangun dan merawat jaringan profesional (networking)',
        'Berkolaborasi dengan tim teknis untuk menyusun proposal klien',
        'Mencapai target akuisisi klien bulanan dan tahunan',
      ],
      requirements: [
        'S1 semua jurusan, diutamakan Akuntansi/Bisnis/Hukum',
        'Pengalaman min. 2 tahun di business development / sales B2B',
        'Jaringan luas di kalangan bisnis dan korporasi Jakarta',
        'Kemampuan komunikasi dan presentasi yang sangat baik',
        'Memiliki kendaraan pribadi dan SIM A (lebih diutamakan)',
      ],
    },
  ];

  openJobIndex = signal<number | null>(null);

  toggleJob(i: number) {
    this.openJobIndex.update(v => (v === i ? null : i));
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Karir Bersama Kami',
      description: 'Bergabunglah dengan tim profesional IJF Fintax. Cek posisi terbuka dan bangun karir impian Anda di industri pajak dan akuntansi.',
      keywords: 'lowongan kerja konsultan pajak jakarta, karir akuntan, tax consultant vacancy, IJF fintax career',
      slug: 'career',
    });
  }
}
