export interface TechDetail {
  icon: string; // logo en public/tech-icons/
  name: string;
  description: string; // qué aporta esta tecnología dentro del servicio
}

export interface ServiceDetail {
  id: string; // ruta de su página: /servicios/<id>
  icon: string; // nombre de Material Icon
  title: string;
  summary: string;
  intro: string; // párrafo de apertura de la página del servicio
  includes: string[]; // qué incluye el servicio
  idealFor: string[]; // señales de que su empresa lo necesita
  contactInterest: string; // opción del formulario de contacto que se preselecciona
  technologies: TechDetail[];
}
