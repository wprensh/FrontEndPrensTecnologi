import { buildMailto } from './contact.service';

describe('buildMailto', () => {
  const request = {
    name: 'Ana Gómez',
    email: 'ana@correo.com',
    company: '',
    phone: '300 123 4567',
    interest: 'Nube y DevOps',
    message: 'Queremos llevar nuestra aplicación a Azure con CI/CD.',
  };

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
