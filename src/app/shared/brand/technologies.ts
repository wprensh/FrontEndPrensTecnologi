// Tecnologías de la empresa. Las usan el banner del shell y la página de inicio,
// por eso viven en shared/ y no dentro de un slice.

export type TechCategory = 'backend' | 'frontend' | 'cloud' | 'data' | 'ai';

export interface Technology {
  name: string;
  category: TechCategory;
  icon: string; // archivo en public/tech-icons/, sin extensión
}

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  backend: 'Backend',
  frontend: 'Web y móvil',
  cloud: 'Nube y DevOps',
  data: 'Datos y mensajería',
  ai: 'Inteligencia artificial',
};

export const TECHNOLOGIES: Technology[] = [
  { name: 'C# / .NET 8', category: 'backend', icon: 'dotnetcore' },
  { name: 'Node.js', category: 'backend', icon: 'nodejs' },
  { name: 'Angular', category: 'frontend', icon: 'angular' },
  { name: 'React', category: 'frontend', icon: 'react' },
  { name: 'React Native', category: 'frontend', icon: 'react' },
  { name: 'Azure', category: 'cloud', icon: 'azure' },
  { name: 'Docker', category: 'cloud', icon: 'docker' },
  { name: 'SQL Server', category: 'data', icon: 'microsoftsqlserver' },
  { name: 'MySQL', category: 'data', icon: 'mysql' },
  { name: 'Oracle', category: 'data', icon: 'oracle' },
  { name: 'Redis', category: 'data', icon: 'redis' },
  { name: 'RabbitMQ', category: 'data', icon: 'rabbitmq' },
  { name: 'Claude / LLMs', category: 'ai', icon: 'claude' },
];
