import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private http = inject(HttpClient);

  private readonly API = 'https://api.emailjs.com/api/v1.0/email/send';

  send(payload: ContactPayload) {
    const body = {
      service_id: environment.emailjs.serviceId,
      template_id: environment.emailjs.templateId,
      user_id: environment.emailjs.publicKey,
      template_params: {
        from_name: payload.name,
        from_company: payload.company || '-',
        from_email: payload.email,
        from_phone: payload.phone || '-',
        service_needed: payload.service || '-',
        message: payload.message,
        reply_to: payload.email,
      },
    };

    return this.http.post(this.API, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }
}
