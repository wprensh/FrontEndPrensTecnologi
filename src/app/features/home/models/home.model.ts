export interface Service {
  id: string; // página del servicio: /servicios/<id>
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

export interface Skill {
  name: string;
  icon?: string; // logo de public/tech-icons/, si la habilidad es una tecnología
}

export interface CaseStudy {
  sector: string;
  title: string;
  description: string;
  skills: Skill[]; // habilidades que demostró ese proyecto
}
