export interface Service {
  icon: string; // nombre de Material Icon
  title: string;
  description: string;
  logos: string[]; // logos de public/tech-icons/ relacionados con el servicio
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
