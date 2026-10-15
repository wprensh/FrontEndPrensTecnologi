export interface TechDetail {
  icon: string; // logo en public/tech-icons/
  name: string;
  description: string; // qué aporta esta tecnología dentro del servicio
}

export interface ServiceDetail {
  id: string; // ancla en la página: /servicios#<id>
  icon: string; // nombre de Material Icon
  title: string;
  summary: string;
  technologies: TechDetail[];
}
