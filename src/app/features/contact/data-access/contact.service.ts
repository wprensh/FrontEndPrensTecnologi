import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { API_URL } from '../../../core/http/api-url';
import { HANDLES_OWN_ERRORS } from '../../../core/http/error.interceptor';
import { CONTACT } from '../../../shared/brand/contact';
import { ContactRequest } from '../models/contact.model';

/** Cómo salió el mensaje: por el API del backend o, si no hay API configurado, por el correo del visitante. */
export type ContactDelivery = 'api' | 'mailto';

/** Cuerpo que espera POST /api/contacto del backend .NET. */
export interface ContactApiRequest {
  nombre: string;
  correo: string;
  empresa: string | null;
  telefono: string | null;
  interes: string;
  mensaje: string;
}

export function toApiRequest(request: ContactRequest): ContactApiRequest {
  return {
    nombre: request.name.trim(),
    correo: request.email.trim(),
    empresa: request.company.trim() || null,
    telefono: request.phone.trim() || null,
    interes: request.interest,
    mensaje: request.message.trim(),
  };
}

/** Arma el correo con los datos del formulario, para cuando el sitio no tiene un API de contacto. */
export function buildMailto(request: ContactRequest, to = CONTACT.email): string {
  const details = [
    `Nombre: ${request.name}`,
    `Correo: ${request.email}`,
    request.company ? `Empresa: ${request.company}` : null,
    request.phone ? `Teléfono: ${request.phone}` : null,
    `Servicio de interés: ${request.interest}`,
  ].filter((line) => line !== null);

  const subject = `Contacto web: ${request.interest} · ${request.name}`;
  const body = [...details, '', request.message].join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Mensaje para el visitante cuando el API rechaza o no recibe el envío. */
export function sendErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status === 429) {
    return 'Ha enviado varios mensajes seguidos. Espere unos minutos e intente de nuevo.';
  }
  return `No pudimos enviar su mensaje. Intente de nuevo o escríbanos a ${CONTACT.email}.`;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly apiUrl = inject(API_URL);

  /** Envía el mensaje por el API; sin API configurado, abre el cliente de correo del visitante con el mensaje listo. */
  send(request: ContactRequest): Observable<ContactDelivery> {
    if (!this.apiUrl) {
      this.document.location.href = buildMailto(request);
      return of('mailto');
    }

    return this.http
      .post(`${this.apiUrl}/api/contacto`, toApiRequest(request), { context: new HttpContext().set(HANDLES_OWN_ERRORS, true) })
      .pipe(map(() => 'api' as const));
  }
}
