import { ServiceDetail } from '../models/services.model';

// Catálogo de servicios con la descripción de cada tecnología en su contexto.
// Si más adelante viene de un CMS o API, solo cambia este archivo.

export const SERVICE_CATALOG: ServiceDetail[] = [
  {
    id: 'desarrollo',
    icon: 'code',
    title: 'Desarrollo a la medida',
    summary: 'Construimos aplicaciones web y móviles a la medida de su operación, con código mantenible y probado.',
    technologies: [
      { icon: 'dotnetcore', name: 'C# / .NET 8', description: 'Backend robusto organizado con Clean Architecture y CQRS, preparado para crecer sin reescribir.' },
      { icon: 'angular', name: 'Angular', description: 'Aplicaciones web empresariales con componentes standalone, signals y Angular Material: rápidas y accesibles.' },
      { icon: 'react', name: 'React', description: 'Interfaces interactivas y reutilizables para portales y paneles que cambian con frecuencia.' },
      { icon: 'react', name: 'React Native', description: 'Apps para iOS y Android desde una sola base de código, con experiencia nativa.' },
    ],
  },
  {
    id: 'apis',
    icon: 'hub',
    title: 'APIs e integraciones',
    summary: 'Conectamos sus sistemas internos y de terceros con APIs seguras, documentadas y versionadas.',
    technologies: [
      { icon: 'dotnetcore', name: 'ASP.NET Core', description: 'APIs REST de alto rendimiento con autenticación JWT u OAuth, validación y documentación OpenAPI.' },
      { icon: 'nodejs', name: 'Node.js', description: 'Servicios ligeros para webhooks, integraciones en tiempo real y adaptadores hacia servicios SOAP heredados.' },
      { icon: 'redis', name: 'Redis', description: 'Caché distribuida que reduce los tiempos de respuesta y la carga sobre sus bases de datos.' },
    ],
  },
  {
    id: 'microservicios',
    icon: 'lan',
    title: 'Microservicios y mensajería',
    summary: 'Arquitecturas desacopladas en las que cada componente escala y se despliega de forma independiente.',
    technologies: [
      { icon: 'rabbitmq', name: 'RabbitMQ', description: 'Mensajería asíncrona confiable con colas, reintentos y patrones de publicación y suscripción.' },
      { icon: 'azure', name: 'Azure Service Bus', description: 'Mensajería administrada en la nube con temas, sesiones y entrega garantizada entre servicios.' },
      { icon: 'docker', name: 'Docker', description: 'Cada microservicio empaquetado en su contenedor, idéntico en desarrollo, pruebas y producción.' },
    ],
  },
  {
    id: 'nube',
    icon: 'cloud',
    title: 'Nube y DevOps',
    summary: 'Infraestructura en la nube y entrega continua para publicar cambios en horas, no en días.',
    technologies: [
      { icon: 'azure', name: 'Microsoft Azure', description: 'App Service, Functions y Key Vault para alojar sus aplicaciones con seguridad y alta disponibilidad.' },
      { icon: 'azuredevops', name: 'Azure DevOps', description: 'Pipelines CI/CD con pruebas automáticas, aprobaciones y despliegues sin interrupciones.' },
      { icon: 'docker', name: 'Docker', description: 'Imágenes reproducibles que simplifican los despliegues y eliminan las diferencias entre ambientes.' },
    ],
  },
  {
    id: 'migracion',
    icon: 'trending_up',
    title: 'Migración y escalado',
    summary: 'Modernizamos sus aplicaciones heredadas sin detener la operación del negocio.',
    technologies: [
      { icon: 'dotnetcore', name: '.NET 8', description: 'Migración desde .NET Framework con mejor rendimiento y soporte de largo plazo.' },
      { icon: 'microsoftsqlserver', name: 'SQL Server', description: 'Optimización de consultas, índices y procedimientos para soportar mayor volumen de datos.' },
      { icon: 'oracle', name: 'Oracle', description: 'Migración e integración de datos desde Oracle con validación y conciliación de la información.' },
      { icon: 'azure', name: 'Azure', description: 'Escala vertical y horizontal automática según la demanda real de sus usuarios.' },
    ],
  },
  {
    id: 'telemetria',
    icon: 'monitoring',
    title: 'Telemetría de aplicaciones',
    summary: 'Visibilidad en tiempo real de cómo se comportan sus sistemas en producción.',
    technologies: [
      { icon: 'azure', name: 'Azure Monitor', description: 'Application Insights con métricas, trazas distribuidas y alertas para detectar fallas antes que sus usuarios.' },
      { icon: 'docker', name: 'Docker', description: 'Registros y métricas de contenedores centralizados para diagnosticar incidentes en minutos.' },
    ],
  },
  {
    id: 'ia',
    icon: 'auto_awesome',
    title: 'Optimización con IA y LLMs',
    summary: 'Integramos modelos de lenguaje en sus procesos para automatizar tareas repetitivas.',
    technologies: [
      { icon: 'claude', name: 'Claude', description: 'Asistentes y flujos que leen documentos, clasifican solicitudes y redactan respuestas con supervisión humana.' },
      { icon: 'dotnetcore', name: '.NET 8', description: 'Integración segura de los modelos con sus sistemas y datos existentes mediante APIs.' },
      { icon: 'azure', name: 'Azure', description: 'Despliegue de soluciones de IA con control de acceso, registro de uso y cumplimiento.' },
    ],
  },
  {
    id: 'consultoria',
    icon: 'support_agent',
    title: 'Consultoría técnica',
    summary: 'Acompañamos a su equipo para elevar la calidad del software y la velocidad de entrega.',
    technologies: [
      { icon: 'dotnetcore', name: '.NET', description: 'Revisión de código y arquitectura con principios SOLID, patrones de diseño y pruebas unitarias.' },
      { icon: 'angular', name: 'Angular', description: 'Buenas prácticas de frontend: arquitectura vertical, signals y rendimiento.' },
      { icon: 'azuredevops', name: 'Azure DevOps', description: 'Adopción de Scrum, estrategia de ramas y pipelines para entregas predecibles cada quince días.' },
    ],
  },
];
