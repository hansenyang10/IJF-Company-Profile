import { Component, inject, OnInit, OnDestroy, signal, computed, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.services';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CountUpDirective, MatIconModule, FadeInDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private seo = inject(SeoService);

  // ==========================================
  // 1. DATA SECTION (STATIC & SIGNALS)
  // ==========================================
  readonly stats = signal([
    { value: '10+', label: 'Tahun Pengalaman', sub: 'Sejak 2016', icon: 'history' },
    { value: '300+', label: 'Perusahaan Klien', sub: 'Dari berbagai industri', icon: 'business' },
    { value: '98%', label: 'Client Retention', sub: 'Komitmen & kepercayaan klien', icon: 'trending_up' },
    { value: '100%', label: 'Transparan & Akuntabel', sub: 'Dalam setiap proses kerja', icon: 'verified_user' }
  ]);

  readonly services = signal([
    { id: 1, icon: 'analytics', title: 'Tax Advisory', desc: 'Konsultasi strategi perpajakan yang efektif, perencanaan tax planning, dan optimalisasi beban pajak.' },
    { id: 2, icon: 'assignment_turned_in', title: 'Tax Compliance', desc: 'Layanan kepatuhan pajak bulanan, PPh, PPN, PPh 21, PPh 23/26, dan pelaporan SPT.' },
    { id: 3, icon: 'pie_chart', title: 'Accounting & Bookkeeping', desc: 'Pembukuan akurat, laporan keuangan tepat waktu, dan analisis keuangan untuk pengambilan keputusan.' },
    { id: 4, icon: 'verified_user', title: 'Tax Audit & Assistance', desc: 'Pendampingan pemeriksaan pajak, keberatan, banding, dan penyelesaian sengketa pajak.' },
    { id: 5, icon: 'people', title: 'Payroll Service', desc: 'Pengelolaan payroll dan perhitungan PPh 21 yang akurat dan sesuai regulasi terbaru.' },
    { id: 6, icon: 'trending_up', title: 'CFO Advisory', desc: 'Layanan advisory keuangan untuk pertumbuhan bisnis dan profitabilitas yang berkelanjutan.' }
  ]);

  readonly team = signal([
    { name: 'Ignatius Julyani', role: 'Founder & Tax Consultant', tags: ['Brevet A & B', 'Tax Professional', 'IAI, IKPI Member'], img: 'assets/team/user.png' },
    { name: 'Jessica Noviani', role: 'Tax Manager', tags: ['Brevet A & B', 'Tax Compliance', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Robby Kurniawan', role: 'Accounting Manager', tags: ['Akuntan Profesional', 'S1 Akuntansi', 'IAI Member'], img: 'assets/team/user.png' },
    { name: 'Michelle Wijaya', role: 'Audit & Tax Senior', tags: ['Brevet A & B', 'Tax Audit', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Andreas Halim', role: 'Payroll Supervisor', tags: ['Payroll Specialist', 'PPh 21 Expert', 'S1 Akuntansi'], img: 'assets/team/user.png' },
    { name: 'Stefani Claudia', role: 'CFO Advisory Senior', tags: ['Financial Analyst', 'CFO Advisory', 'S1 Akuntansi'], img: 'assets/team/user.png' }
  ]);

  readonly insights = signal([
    { title: 'Perubahan Tarif Pajak 2026, Apa yang Perlu Anda Ketahui?', tag: 'Perpajakan', date: '20 Mei 2026', img: 'assets/insights/news1.jpg' },
    { title: '5 Kesalahan SPT yang Sering Dilakukan Wajib Pajak', tag: 'Tax Tips', date: '15 Mei 2026', img: 'assets/insights/news2.jpg' },
    { title: 'Perubahan Tarif Pajak 2026, Apa yang Perlu Anda Ketahui?', tag: 'Perpajakan', date: '20 Mei 2026', img: 'assets/insights/news1.jpg' },
    { title: 'Update PMK Terbaru Terkait PPh dan Faktur Pajak', tag: 'Regulasi', date: '10 Mei 2026', img: 'assets/insights/news3.jpg' }
  ]);

  companyPages = [
    {
      logos: [
        { name: 'Sinarmas', src: 'assets/logos/sinarmas.png' },
        { name: 'Unilever', src: 'assets/logos/shopee.png' },
        { name: 'Delloite', src: 'assets/logos/delloite.png' },
        { name: 'Astra', src: 'assets/logos/astra.png' },
      ]
    },
    {
      logos: [
        { name: 'Delloite', src: 'assets/logos/delloite.png' },
        { name: 'Mayora', src: 'assets/logos/mayora.png' },
        { name: 'Maybank', src: 'assets/logos/maybank.png' },
        { name: 'Astra', src: 'assets/logos/astra.png' },
      ]
    }
  ];

  // ==========================================
  // 2. KONTROL STATE & DRAG LOGIC
  // ==========================================
  currentPage = signal<number>(0);
  autoPlayInterval: any;
  isCompanyDragging = false;
  companyDragOffset = signal<number>(0);

  // State Slider Team (Anggota) + Responsive Tracker
  currentTeamIndex = signal<number>(0);
  isTeamDragging = false;
  teamDragOffset = signal<number>(0);
  windowWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // KUNCI: Menghitung jumlah item team yang terlihat di layar berdasarkan SCSS
  visibleTeamItems = computed(() => {
    const width = this.windowWidth();
    if (width > 1200) return 4;
    if (width > 992) return 3;
    if (width > 576) return 2;
    return 1;
  });

  // KUNCI: Menghitung batas indeks maksimal agar tidak menggeser ke area kosong
  maxTeamIndex = computed(() => {
    const max = this.team().length - this.visibleTeamItems();
    return max < 0 ? 0 : max;
  });

  currentInsightIndex = signal<number>(0);

  private startX = 0;
  private currentX = 0;

  // ==========================================
  // 3. LIFECYCLE HOOKS & RESIZE LISTENER
  // ==========================================
  ngOnInit() {
    this.seo.generateTags({
      description: 'Firma konsultan pajak dan akuntansi tepercaya untuk pertumbuhan bisnis Anda.',
      keywords: 'konsultan pajak, accounting jkt, tax compliance, laporan keuangan',
      slug: ''
    });
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.windowWidth.set(window.innerWidth);
      // Jika resolusi mengecil, paksa index agar tidak melebihi batas maxTeamIndex yang baru
      if (this.currentTeamIndex() > this.maxTeamIndex()) {
        this.currentTeamIndex.set(this.maxTeamIndex());
      }
    }
  }

  // ==========================================
  // 4. METHOD: SLIDER COMPANY LOGO
  // ==========================================
  goToPage(index: number) {
    this.currentPage.set(index);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      const nextActive = (this.currentPage() + 1) % this.companyPages.length;
      this.currentPage.set(nextActive);
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  onCompanyDragStart(event: MouseEvent | TouchEvent) {
    this.isCompanyDragging = true;
    this.stopAutoPlay();
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentX = this.startX;
  }

  onCompanyDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isCompanyDragging) return;
    this.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.companyDragOffset.set(this.currentX - this.startX);
  }

  onCompanyDragEnd() {
    if (!this.isCompanyDragging) return;
    this.isCompanyDragging = false;
    const diff = this.currentX - this.startX;
    const threshold = 60;

    if (diff < -threshold) {
      const next = (this.currentPage() + 1) % this.companyPages.length;
      this.currentPage.set(next);
    } else if (diff > threshold) {
      const prev = (this.currentPage() - 1 + this.companyPages.length) % this.companyPages.length;
      this.currentPage.set(prev);
    }
    this.companyDragOffset.set(0);
    this.startAutoPlay();
  }

  // ==========================================
  // 5. METHOD BARU: SLIDER TIM PROFESIONAL (FIXED CLAMPED)
  // ==========================================
  nextTeam() {
    if (this.currentTeamIndex() < this.maxTeamIndex()) {
      this.currentTeamIndex.update(idx => idx + 1);
    }
  }

  prevTeam() {
    if (this.currentTeamIndex() > 0) {
      this.currentTeamIndex.update(idx => idx - 1);
    }
  }

  onTeamDragStart(event: MouseEvent | TouchEvent) {
    this.isTeamDragging = true;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentX = this.startX;
  }

  onTeamDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isTeamDragging) return;
    this.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    
    let offset = this.currentX - this.startX;

    // Proteksi geser drag elastis saat mentok ujung kiri / kanan
    if (this.currentTeamIndex() === 0 && offset > 0) offset /= 3;
    if (this.currentTeamIndex() >= this.maxTeamIndex() && offset < 0) offset /= 3;

    this.teamDragOffset.set(offset);
  }

  onTeamDragEnd() {
    if (!this.isTeamDragging) return;
    this.isTeamDragging = false;
    const diff = this.currentX - this.startX;
    const threshold = 80;

    if (diff < -threshold) {
      this.nextTeam();
    } else if (diff > threshold) {
      this.prevTeam();
    }
    this.teamDragOffset.set(0);
  }

  // ==========================================
  // 6. METHOD: SLIDER INSIGHTS
  // ==========================================
  nextInsight() {
    const totalItems = this.insights().length;
    this.currentInsightIndex.update(idx => (idx + 1) % totalItems);
  }

  prevInsight() {
    const totalItems = this.insights().length;
    this.currentInsightIndex.update(idx => (idx - 1 + totalItems) % totalItems);
  }

  setInsightIndex(index: number) {
    this.currentInsightIndex.set(index);
  }
}