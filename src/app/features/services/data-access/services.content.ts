import { ServiceDetail } from '../models/services.model';

// Catálogo de servicios con la descripción de cada tecnología en su contexto.
// Si más adelante viene de un CMS o API, solo cambia este archivo.

export const SERVICE_CATALOG: ServiceDetail[] = [
  {
    id: 'desarrollo',
    icon: 'code',
    title: 'Desarrollo a la medida',
    summary: 'Construimos aplicaciones web y móviles a la medida de su operación, con código mantenible y probado.',
    intro: 'Diseñamos y construimos el software que su operación necesita, en lugar de adaptar su negocio a una herramienta genérica. Trabajamos por entregas quincenales para que vea avances reales desde la primera semana.',
    includes: [
      'Levantamiento de requisitos y prototipo navegable',
      'Arquitectura limpia (Clean Architecture, CQRS y SOLID)',
      'Aplicaciones web, móviles o ambas desde una base compartida',
      'Pruebas unitarias y revisión de código en cada entrega',
      'Documentación técnica y transferencia de conocimiento a su equipo',
    ],
    idealFor: [
      'Sus procesos dependen de hojas de cálculo o tareas manuales',
      'Ningún software del mercado se ajusta a su forma de trabajar',
      'Necesita un portal o app para clientes, proveedores o empleados',
    ],
    contactInterest: 'Desarrollo a la medida',
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
    intro: 'Hacemos que sus sistemas conversen entre sí: ERP, facturación, reservas, pasarelas de pago y servicios de terceros. Cada integración queda documentada, versionada y monitoreada.',
    includes: [
      'Diseño de APIs REST con contrato OpenAPI',
      'Integración con servicios SOAP y sistemas heredados',
      'Autenticación con JWT u OAuth 2.0 y control de acceso',
      'Caché, reintentos y límites de uso para alta disponibilidad',
      'Portal de documentación para los equipos que consumen la API',
    ],
    idealFor: [
      'Su equipo copia datos a mano de un sistema a otro',
      'Necesita exponer información a aliados o a una app móvil',
      'Sus integraciones actuales fallan sin que nadie lo note',
    ],
    contactInterest: 'APIs e integraciones',
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
    intro: 'Separamos su plataforma en servicios independientes que se comunican por mensajes. Así cada parte escala, se despliega y falla de forma aislada, sin tumbar todo el sistema.',
    includes: [
      'Identificación de dominios y límites entre servicios',
      'Mensajería asíncrona con RabbitMQ o Azure Service Bus',
      'Patrones de reintento, colas de errores e idempotencia',
      'Contenedores Docker listos para orquestar',
      'Estrategia de migración gradual desde un monolito',
    ],
    idealFor: [
      'Un cambio pequeño obliga a desplegar toda la aplicación',
      'Los picos de carga de un módulo afectan a los demás',
      'Necesita procesar eventos en tiempo real, como en planta o logística',
    ],
    contactInterest: 'Microservicios y mensajería',
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
    intro: 'Llevamos sus aplicaciones a Azure con infraestructura segura y pipelines que prueban y publican cada cambio automáticamente. Pasamos de despliegues de un día a despliegues de menos de una hora.',
    includes: [
      'Diseño de la infraestructura en Azure (App Service, Functions, Key Vault)',
      'Pipelines CI/CD en Azure DevOps con pruebas y aprobaciones',
      'Contenedores Docker y ambientes idénticos de desarrollo a producción',
      'Gestión segura de secretos y configuración',
      'Optimización de costos de la nube',
    ],
    idealFor: [
      'Publicar una versión nueva toma horas o un fin de semana',
      'Sus servidores locales están al límite o sin respaldo',
      'Quiere ambientes de pruebas iguales a producción',
    ],
    contactInterest: 'Nube y DevOps',
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
    intro: 'Modernizamos aplicaciones heredadas a .NET actual y preparamos su base de datos para crecer, migrando por etapas para que la operación nunca se detenga.',
    includes: [
      'Diagnóstico del código y la base de datos actuales',
      'Migración de .NET Framework a .NET moderno',
      'Optimización de consultas, índices y procedimientos',
      'Migración de datos con validación y conciliación',
      'Escalado vertical y horizontal en Azure',
    ],
    idealFor: [
      'Su aplicación corre en tecnología sin soporte del fabricante',
      'El sistema se vuelve lento a medida que crecen los datos',
      'Le cuesta encontrar quién mantenga el código actual',
    ],
    contactInterest: 'Migración y escalado',
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
    intro: 'Instrumentamos sus aplicaciones para que sepa en tiempo real qué está pasando en producción: qué falla, qué es lento y qué usan sus clientes, antes de que llegue la primera queja.',
    includes: [
      'Instrumentación con Application Insights y trazas distribuidas',
      'Tableros de métricas técnicas y de negocio',
      'Alertas por correo o Teams ante errores y degradación',
      'Registros centralizados de aplicaciones y contenedores',
      'Análisis de causa raíz de incidentes',
    ],
    idealFor: [
      'Se entera de las fallas por sus clientes',
      'Diagnosticar un error toma días de revisar archivos',
      'Quiere medir tiempos de respuesta y uso real del sistema',
    ],
    contactInterest: 'Telemetría de aplicaciones',
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
    intro: 'Aplicamos modelos de lenguaje como Claude a tareas concretas de su operación: leer documentos, clasificar solicitudes o redactar respuestas, siempre con supervisión humana y datos protegidos.',
    includes: [
      'Identificación de procesos con mayor retorno para automatizar',
      'Asistentes integrados a sus sistemas y documentos',
      'Extracción de datos de facturas, contratos y formularios',
      'Controles de calidad, registro de uso y revisión humana',
      'Medición del ahorro de tiempo obtenido',
    ],
    idealFor: [
      'Su equipo dedica horas a leer, clasificar o transcribir documentos',
      'Recibe muchas solicitudes repetitivas por correo o chat',
      'Quiere usar IA sin exponer información sensible',
    ],
    contactInterest: 'IA y LLMs',
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
    intro: 'Acompañamos a su equipo de desarrollo con revisiones, mentoría y buenas prácticas para que entregue software de mejor calidad, con menos errores y en ciclos predecibles.',
    includes: [
      'Revisión de arquitectura y código con recomendaciones priorizadas',
      'Definición de estándares, estrategia de ramas y revisiones',
      'Mentoría en .NET, Angular y Azure DevOps',
      'Adopción de Scrum con entregas quincenales',
      'Plan de mejora con indicadores medibles',
    ],
    idealFor: [
      'Los errores en producción son frecuentes',
      'Las entregas se retrasan sin que sepa por qué',
      'Su equipo crece y necesita orden y estándares comunes',
    ],
    contactInterest: 'Consultoría técnica',
    technologies: [
      { icon: 'dotnetcore', name: '.NET', description: 'Revisión de código y arquitectura con principios SOLID, patrones de diseño y pruebas unitarias.' },
      { icon: 'angular', name: 'Angular', description: 'Buenas prácticas de frontend: arquitectura vertical, signals y rendimiento.' },
      { icon: 'azuredevops', name: 'Azure DevOps', description: 'Adopción de Scrum, estrategia de ramas y pipelines para entregas predecibles cada quince días.' },
    ],
  },
];

export function findService(id: string | null | undefined): ServiceDetail | undefined {
  return SERVICE_CATALOG.find((service) => service.id === id);
}
