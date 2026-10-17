import { inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

// Exige dominio con extensión (ana@correo.com), cosa que Validators.email no pide.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Formulario de contacto con sus reglas; cada diseño lo crea con contactForm() dentro de su contexto de inyección.
export function contactForm() {
  return inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL), Validators.maxLength(254)]],
    company: ['', Validators.maxLength(100)],
    phone: ['', Validators.pattern(/^[+\d][\d\s-]{6,19}$/)],
    interest: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]],
  });
}

export type ContactForm = ReturnType<typeof contactForm>;

const MESSAGES: Record<string, string> = {
  required: 'Este campo es obligatorio.',
  email: 'Escriba un correo válido.',
  pattern: 'Escriba un teléfono válido.',
  minlength: 'Cuéntenos un poco más (mínimo 20 caracteres).',
  maxlength: 'El texto es demasiado largo.',
};

/** Mensaje del primer error del campo, para mostrar en <mat-error>. */
export function fieldError(form: ContactForm, field: keyof ContactForm['controls']): string {
  const errors = form.controls[field].errors;
  const key = errors ? Object.keys(errors)[0] : '';
  if (key === 'pattern') {
    return field === 'email' ? MESSAGES['email'] : MESSAGES['pattern'];
  }
  return MESSAGES[key] ?? '';
}
