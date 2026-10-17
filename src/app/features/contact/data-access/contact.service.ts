import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { CONTACT } from '../../../shared/brand/contact';
import { ContactRequest } from '../models/contact.model';

/** Arma el correo con los datos del formulario: el sitio es estático y aún no tiene un API de contacto. */
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

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly document = inject(DOCUMENT);

  /** Abre el cliente de correo del visitante con el mensaje listo para enviar. */
  send(request: ContactRequest): void {
    this.document.location.href = buildMailto(request);
  }
}
