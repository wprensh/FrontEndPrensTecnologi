export type TechCategory = 'backend' | 'frontend' | 'cloud' | 'data' | 'ai';

export interface Service {
  icon: string; // nombre de Material Icon
  title: string;
  description: string;
}

export interface Technology {
  name: string;
  category: TechCategory;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Result {
  value: string;
  label: string;
}

export interface CaseStudy {
  sector: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  city: string;
}

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  backend: 'Backend',
  frontend: 'Web y móvil',
  cloud: 'Nube y DevOps',
  data: 'Datos y mensajería',
  ai: 'Inteligencia artificial',
};
