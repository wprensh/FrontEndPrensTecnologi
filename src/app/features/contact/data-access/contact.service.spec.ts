import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_URL } from '../../../core/http/api-url';
import { ContactRequest } from '../models/contact.model';
import { ContactService, buildMailto, toApiRequest } from './contact.service';

const request: ContactRequest = {
  name: 'Ana Gómez',
  email: 'ana@correo.com',
  company: '',
  phone: '300 123 4567',
  interest: 'Nube y DevOps',
  message: 'Queremos llevar nuestra aplicación a Azure con CI/CD.',
};

describe('buildMailto', () => {
  it('dirige el correo a Prens con asunto y cuerpo codificados', () => {
    const url = buildMailto(request, 'hola@prens.co');
    const [address, query] = url.split('?');
    const params = new URLSearchParams(query);

    expect(address).toBe('mailto:hola@prens.co');
    expect(params.get('subject')).toBe('Contacto web: Nube y DevOps · Ana Gómez');
    expect(params.get('body')).toContain('Teléfono: 300 123 4567');
    expect(params.get('body')).toContain('Queremos llevar nuestra aplicación a Azure');
  });

  it('omite los campos opcionales vacíos', () => {
    const body = new URLSearchParams(buildMailto(request).split('?')[1]).get('body');

    expect(body).not.toContain('Empresa:');
  });
});

describe('toApiRequest', () => {
  it('usa los nombres del backend y envía null en los opcionales vacíos', () => {
    expect(toApiRequest({ ...request, name: '  Ana Gómez ' })).toEqual({
      nombre: 'Ana Gómez',
      correo: 'ana@correo.com',
      empresa: null,
      telefono: '300 123 4567',
      interes: 'Nube y DevOps',
      mensaje: 'Queremos llevar nuestra aplicación a Azure con CI/CD.',
    });
  });
});

describe('ContactService', () => {
  function setup(apiUrl: string) {
    const location = { href: '' };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: apiUrl },
        { provide: DOCUMENT, useValue: { location } },
      ],
    });
    return { service: TestBed.inject(ContactService), http: TestBed.inject(HttpTestingController), location };
  }

  it('publica el mensaje en el API cuando está configurado', () => {
    const { service, http } = setup('http://api.test');
    let delivery = '';

    service.send(request).subscribe((result) => (delivery = result));
    const req = http.expectOne('http://api.test/api/contacto');
    req.flush({ fechaEnvio: '2026-10-17T00:00:00Z' }, { status: 202, statusText: 'Accepted' });

    expect(req.request.method).toBe('POST');
    expect(req.request.body.correo).toBe('ana@correo.com');
    expect(delivery).toBe('api');
    http.verify();
  });

  it('abre el correo del visitante si el API no está disponible', () => {
    const { service, http, location } = setup('http://api.test');
    let delivery = '';

    service.send(request).subscribe((result) => (delivery = result));
    http.expectOne('http://api.test/api/contacto').flush({}, { status: 503, statusText: 'Service Unavailable' });

    expect(delivery).toBe('mailto');
    expect(location.href).toMatch(/^mailto:/);
  });

  it('deja el error 429 al formulario', () => {
    const { service, http } = setup('http://api.test');
    let status = 0;

    service.send(request).subscribe({ error: (error) => (status = error.status) });
    http.expectOne('http://api.test/api/contacto').flush({}, { status: 429, statusText: 'Too Many Requests' });

    expect(status).toBe(429);
  });

  it('abre el correo del visitante cuando no hay API', () => {
    const { service, http, location } = setup('');
    let delivery = '';

    service.send(request).subscribe((result) => (delivery = result));

    expect(delivery).toBe('mailto');
    expect(location.href).toMatch(/^mailto:/);
    http.verify();
  });
});
