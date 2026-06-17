import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { SeoService } from '../../shared/services/seo.services';
import { EmailService } from '../../shared/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, FadeInDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);

  readonly contactInfo = [
    { icon: 'phone', label: 'Telepon', value: '+62 812-3456-7890', hint: 'Senin – Jumat, 09.00 – 17.00 WIB', href: 'tel:+628123456789' },
    { icon: 'email', label: 'Email', value: 'info@fintax.co.id', hint: 'Balasan dalam 1×24 jam kerja', href: 'mailto:info@fintax.co.id' },
    { icon: 'location_on', label: 'Kantor', value: 'Jakarta, Indonesia', hint: 'Kunjungan dengan janji terlebih dahulu', href: '#' },
  ];

  readonly serviceOptions = [
    'Tax Advisory',
    'Tax Compliance',
    'Accounting & Bookkeeping',
    'Tax Audit & Assistance',
    'Payroll Service',
    'CFO Advisory',
    'Lainnya',
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    service: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isSubmitting = signal(false);
  submitted = signal(false);
  submitError = signal<string | null>(null);

  field(name: string) {
    return this.form.get(name)!;
  }

  hasError(name: string) {
    const f = this.field(name);
    return f.invalid && f.touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const v = this.form.value;
    this.emailService.send({
      name: v.name!,
      company: v.company ?? '',
      email: v.email!,
      phone: v.phone ?? '',
      service: v.service ?? '',
      message: v.message!,
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        this.form.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set('Pesan gagal terkirim. Silakan coba lagi atau hubungi kami via WhatsApp.');
      },
    });
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Hubungi Kami',
      description: 'Konsultasikan kebutuhan pajak dan akuntansi Anda. Hubungi tim IJF Fintax melalui telepon, email, atau isi formulir kontak kami.',
      keywords: 'kontak IJF fintax, konsultasi pajak jakarta, hubungi konsultan pajak',
      slug: 'contact',
    });
  }
}
