import { CaseStudy, ProcessStep, Result, Service } from '../models/home.model';

// Contenido tomado del brochure de Prens. Si más adelante viene de un CMS o API,
// solo cambia este archivo por un servicio en data-access/.

export const SERVICES: Service[] = [
  { icon: 'code', title: 'Desarrollo a la medida', description: 'Aplicaciones web y móviles con .NET, Angular, React y React Native.', logos: ['dotnetcore', 'angular', 'react'] },
  { icon: 'hub', title: 'APIs e integraciones', description: 'Servicios REST y SOAP que conectan sus sistemas internos y de terceros.', logos: ['dotnetcore', 'nodejs'] },
  { icon: 'lan', title: 'Microservicios y mensajería', description: 'Arquitecturas desacopladas con RabbitMQ y Azure Service Bus.', logos: ['rabbitmq', 'azure', 'docker'] },
  { icon: 'cloud', title: 'Nube y DevOps', description: 'Azure, Docker, Key Vault y pipelines CI/CD en Azure DevOps.', logos: ['azure', 'azuredevops', 'docker'] },
  { icon: 'trending_up', title: 'Migración y escalado', description: 'Llevamos sus aplicaciones a .NET moderno, con escala vertical y horizontal.', logos: ['dotnetcore', 'azure'] },
  { icon: 'monitoring', title: 'Telemetría de aplicaciones', description: 'Monitoreo, métricas y trazas para ver en tiempo real cómo se comportan sus sistemas.', logos: ['azure'] },
  { icon: 'auto_awesome', title: 'Optimización con IA y LLMs', description: 'Optimizamos procesos con Claude y modelos de lenguaje integrados a sus sistemas.', logos: ['claude'] },
  { icon: 'support_agent', title: 'Consultoría técnica', description: 'Revisión de código, estándares y mentoría para su equipo de desarrollo.', logos: ['dotnetcore', 'angular', 'azuredevops'] },
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
  {
    sector: 'Industria energética',
    title: 'Trazabilidad de planta en tiempo real',
    description: 'Mensajería asíncrona para la producción de transformadores: −40% en respuesta y −50% en consolidación de datos.',
    skills: [{ name: '.NET', icon: 'dotnetcore' }, { name: 'RabbitMQ', icon: 'rabbitmq' }, { name: 'Azure Service Bus', icon: 'azure' }, { name: 'Mensajería asíncrona' }, { name: 'Tiempo real' }],
  },
  {
    sector: 'Hotelería',
    title: 'Gestión digital de habitaciones',
    description: 'Más de 10 integraciones con reservas y facturación: −60% en tiempo de asignación.',
    skills: [{ name: '.NET', icon: 'dotnetcore' }, { name: 'APIs REST' }, { name: 'SQL Server', icon: 'microsoftsqlserver' }, { name: 'Integración de sistemas' }, { name: 'Automatización de procesos' }],
  },
  {
    sector: 'Sistemas corporativos',
    title: 'Integración y entrega continua',
    description: '15+ APIs entre sistemas y despliegues de 1 día a menos de 1 hora.',
    skills: [{ name: 'Azure DevOps', icon: 'azuredevops' }, { name: 'Docker', icon: 'docker' }, { name: 'CI/CD' }, { name: 'APIs REST' }, { name: 'SOAP' }],
  },
  {
    sector: 'Software empresarial',
    title: 'Modernización de aplicaciones',
    description: '8+ aplicaciones construidas y migradas a .NET Core.',
    skills: [{ name: '.NET Core', icon: 'dotnetcore' }, { name: 'Angular', icon: 'angular' }, { name: 'Azure', icon: 'azure' }, { name: 'Migración a .NET' }, { name: 'Clean Architecture' }],
  },
];
