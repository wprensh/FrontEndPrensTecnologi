export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
}

// Lo que el cliente puede elegir como motivo del contacto (los servicios del sitio + "Otro").
export const CONTACT_INTERESTS = [
  'Desarrollo a la medida',
  'APIs e integraciones',
  'Microservicios y mensajería',
  'Nube y DevOps',
  'Migración y escalado',
  'Telemetría de aplicaciones',
  'IA y LLMs',
  'Consultoría técnica',
  'Otro',
] as const;
