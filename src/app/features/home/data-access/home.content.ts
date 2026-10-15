import { CaseStudy, ContactInfo, ProcessStep, Result, Service, Technology } from '../models/home.model';

// Contenido tomado del brochure de Prens. Si más adelante viene de un CMS o API,
// solo cambia este archivo por un servicio en data-access/.

export const SERVICES: Service[] = [
  { icon: 'code', title: 'Desarrollo a la medida', description: 'Aplicaciones web y móviles con .NET, Angular, React y React Native.' },
  { icon: 'hub', title: 'APIs e integraciones', description: 'Servicios REST y SOAP que conectan sus sistemas internos y de terceros.' },
  { icon: 'lan', title: 'Microservicios y mensajería', description: 'Arquitecturas desacopladas con RabbitMQ y Azure Service Bus.' },
  { icon: 'cloud', title: 'Nube y DevOps', description: 'Azure, Docker, Key Vault y pipelines CI/CD en Azure DevOps.' },
  { icon: 'trending_up', title: 'Migración y escalado', description: 'Llevamos sus aplicaciones a .NET moderno, con escala vertical y horizontal.' },
  { icon: 'monitoring', title: 'Telemetría de aplicaciones', description: 'Monitoreo, métricas y trazas para ver en tiempo real cómo se comportan sus sistemas.' },
  { icon: 'auto_awesome', title: 'Optimización con IA y LLMs', description: 'Optimizamos procesos con Claude y modelos de lenguaje integrados a sus sistemas.' },
  { icon: 'support_agent', title: 'Consultoría técnica', description: 'Revisión de código, estándares y mentoría para su equipo de desarrollo.' },
];

export const TECHNOLOGIES: Technology[] = [
  { name: 'C# / .NET 8', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Azure', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'SQL Server', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Oracle', category: 'data' },
  { name: 'RabbitMQ', category: 'data' },
  { name: 'Claude / LLMs', category: 'ai' },
];

export const PROCESS: ProcessStep[] = [
  { title: 'Diagnóstico', description: 'Entendemos su operación y los procesos que hoy son manuales o lentos.' },
  { title: 'Arquitectura', description: 'Diseñamos soluciones desacopladas con Clean Architecture, CQRS y SOLID.' },
  { title: 'Desarrollo ágil', description: 'Entregas quincenales bajo Scrum, con revisión de código y pruebas unitarias.' },
  { title: 'Despliegue y soporte', description: 'CI/CD en Azure DevOps para publicar en horas, no en días.' },
];

export const RESULTS: Result[] = [
  { value: '−40%', label: 'tiempos de respuesta en procesos críticos' },
  { value: '−60%', label: 'tiempo en procesos antes manuales' },
  { value: '<1 h', label: 'despliegues que antes tomaban 1 día' },
  { value: '15+', label: 'APIs de integración construidas' },
];

export const CASES: CaseStudy[] = [
  { sector: 'Industria energética', title: 'Trazabilidad de planta en tiempo real', description: 'Mensajería asíncrona para la producción de transformadores: −40% en respuesta y −50% en consolidación de datos.' },
  { sector: 'Hotelería', title: 'Gestión digital de habitaciones', description: 'Más de 10 integraciones con reservas y facturación: −60% en tiempo de asignación.' },
  { sector: 'Sistemas corporativos', title: 'Integración y entrega continua', description: '15+ APIs entre sistemas y despliegues de 1 día a menos de 1 hora.' },
  { sector: 'Software empresarial', title: 'Modernización de aplicaciones', description: '8+ aplicaciones construidas y migradas a .NET Core.' },
];

export const CONTACT: ContactInfo = {
  email: 'wprensh@hotmail.com',
  phone: '312 612 3419',
  city: 'Cartagena de Indias, Colombia',
};
