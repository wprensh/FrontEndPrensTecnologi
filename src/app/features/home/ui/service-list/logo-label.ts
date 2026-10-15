import { TECHNOLOGIES } from '../../../../shared/brand/technologies';

const EXTRA_LABELS: Record<string, string> = { azuredevops: 'Azure DevOps', dotnetcore: '.NET' };

/** Nombre legible de un logo de public/tech-icons/, para alt y title. */
export function logoLabel(icon: string): string {
  return EXTRA_LABELS[icon] ?? TECHNOLOGIES.find((t) => t.icon === icon)?.name ?? icon;
}
