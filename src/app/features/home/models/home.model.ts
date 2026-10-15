export interface Service {
  icon: string; // nombre de Material Icon
  title: string;
  description: string;
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
